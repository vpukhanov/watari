import { ObjectId } from "mongodb";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import fetch from "node-fetch";
import clientPromise from "./mongodb";

export async function getMonitorsForCurrentUser(context: NextPageContext) {
  const session = await getSession(context);
  const user = session?.user;

  if (!user) {
    return [];
  }

  const client = await clientPromise;
  const userDoc = await client
    .db("watari")
    .collection("users")
    .findOne({
      _id: new ObjectId(user.id),
    });

  if (!userDoc || !userDoc.monitors || userDoc.monitors.length === 0) {
    return [];
  }

  const { monitors } = userDoc;
  const ids = monitors.map((m: any) => m._id);
  const measurementsRq = await fetch(
    `${process.env.YAGAMI_URL}/aggregator/latest`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ids }),
    }
  );
  const measurements = (await measurementsRq.json()) as any;

  return monitors.map((m: any) => ({
    ...m,
    lastResult: measurements[m._id]?.lastResult ?? null,
  }));
}

export async function getMonitorById(context: NextPageContext, id: string) {
  const session = await getSession(context);
  const user = session?.user;

  if (!user || !id?.startsWith(user.id)) {
    return { monitor: null, measurements: null };
  }

  const client = await clientPromise;
  const result = await client
    .db("watari")
    .collection("users")
    .find(
      {
        monitors: { $elemMatch: { _id: id } },
      },
      { projection: { "monitors.$": 1 } }
    );

  const filteredUser = await result.next();

  const monitor = filteredUser?.monitors?.[0] ?? null;
  let measurements = null;

  if (monitor) {
    const measurementsRq = await fetch(
      `${process.env.YAGAMI_URL}/aggregator/range`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      }
    );
    measurements = (await measurementsRq.json()) as any;
    measurements = measurements.map((m: any) => ({
      _id: m._id,
      performance: m.performance ? Math.round(m.performance * 100) : null,
      bestPractices: m.bestPractices ? Math.round(m.bestPractices * 100) : null,
      seo: m.seo ? Math.round(m.seo * 100) : null,
    }));
  }

  return { monitor, measurements };
}
