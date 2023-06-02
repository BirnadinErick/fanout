import { NextRequest, NextResponse } from "next/server";
const { Client, Functions } = require("node-appwrite");
import { info } from "console";

export async function POST(request: NextRequest) {
  const proj_id = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID
    ? process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID
    : undefined;
  const dev_func_id = process.env.APPWRITE_DEV_FUNC_ID
    ? process.env.APPWRITE_DEV_FUNC_ID
    : undefined;
  const med_func_id = process.env.APPWRITE_MED_FUNC_ID
    ? process.env.APPWRITE_MED_FUNC_ID
    : undefined;
  const api_key = process.env.APPWRITE_API_KEY
    ? process.env.APPWRITE_API_KEY
    : undefined;

  if (
    [proj_id, dev_func_id, med_func_id, api_key].some((e) => e === undefined)
  ) {
    throw Error("necessary env var not set");
  }

  const client = new Client();
  const functions = new Functions(client);

  client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(proj_id!)
    .setKey(api_key!);

  Promise.all([
    functions.createExecution(dev_func_id!),
    functions.createExecution(med_func_id!),
  ]).then(([result_dev, result_med]) => {
    info(result_dev);
    info(result_med);
  });

  return NextResponse.json(1);
}
