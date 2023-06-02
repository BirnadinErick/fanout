import { NextRequest, NextResponse } from "next/server";
const { Client, Functions } = require("node-appwrite");
import { info, log } from "console";

export async function POST(request: NextRequest) {
  log("init execution...");
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
  log("vars init-done!");

  if (
    [proj_id, dev_func_id, med_func_id, api_key].some((e) => e === undefined)
  ) {
    [proj_id, dev_func_id, med_func_id, api_key].forEach((e) => log(e));
    throw Error("necessary env var not set");
  }
  log("vars check-done!");
  const client = new Client();
  const functions = new Functions(client);

  client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(proj_id!)
    .setKey(api_key!);
  log("client init-done!");
  Promise.all([
    functions.createExecution(dev_func_id!),
    functions.createExecution(med_func_id!),
  ]).then(([result_dev, result_med]) => {
    info(result_dev);
    info(result_med);
    info(result_dev);
    info(result_med);
  });
  log("execution-done!");
  return NextResponse.json(1);
}
