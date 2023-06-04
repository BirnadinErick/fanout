const fs = require("fs");
const axios = require("axios");
const sdk = require("node-appwrite");

async function fetch(query, variables = {}) {
  const { data } = await axios.post(
    "https://api.hashnode.com/",
    {
      query,
      variables,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return data;
}

const GET_POST_DETAILS = `
    query GetPostDetails($slug:String!) {
      post(slug:$slug, hostname:""){
        title
        brief
        coverImage
        contentMarkdown
        tags{name}
      }
    }
`;

module.exports = async function (req, res) {
  const payload = JSON.parse(req.payload);
  const result = await fetch(GET_POST_DETAILS, { slug: payload.slug });
  const datum = result.data.post;

  const client = new sdk.Client();
  const storage = new sdk.Storage(client);

  client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

  const tags = datum.tags.map((t) => t.name);

  // const data = JSON.stringify({
  //   article: {
  //     title: datum.title,
  //     body_markdown: datum.contentMarkdown,
  //     published: true,
  //     description: datum.brief,
  //     tags: tags,
  //     organization_id: 0,
  //     series: "",
  //     main_image: datum.coverImage,
  //     canonical_url: `https://birnadine.hashnode.dev/${payload.slug}`,
  //   },
  // });

  const wal_payload = {
    uid: payload.uid,
    data: {
      title: datum.title,
      content: datum.contentMarkdown,
      url: "",
      tags: tags,
      img: datum.coverImage,
      desc: datum.brief,
    },
  };

  const store_res = await storage.createFile(
    process.env.WAL_BUCKET_ID,
    `${payload.uid}-${new Date().getTime()}-birn-cc`,
    sdk.InputFile.fromPlainText(
      JSON.stringify(wal_payload),
      `${payload.uid}-${new Date().getTime()}-birn-cc.json`
    )
  );

  console.log(store_res);

  // const dev_result = await functions.createExecution(
  //   process.env.APPWRITE_DEV_ID,
  //   data
  // );

  // const med_result = await functions.createExecution(
  //   process.env.APPWRITE_MED_ID,
  //   data
  // );

  // console.log(med_result);
  // console.log(dev_result);

  res.send(1);
};
