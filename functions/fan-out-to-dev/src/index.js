const axios = require("axios");
const sdk = require("node-appwrite");

async function fetch_hn(query, variables = {}) {
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
  console.log(payload);
  const result = await fetch_hn(GET_POST_DETAILS, { slug: payload.slug });
  const datum = result.data.post;
  console.log(datum);

  const client = new sdk.Client();
  const database = new sdk.Databases(client);

  client
    .setEndpoint(req.variables["ENDPOINT"])
    .setProject(req.variables["PROJ_ID"])
    .setKey(req.variables["FUNC_KEY"]);

  const doc = await database.getDocument(
    req.variables["TOKENS_DB_ID"],
    req.variables["TOKENS_COLL_ID"],
    payload.did
  );

  try {
    const dev_post = await axios.post(
      "https://dev.to/api/articles",
      {
        article: {
          title: datum.title,
          body_markdown: datum.contentMarkdown,
          published: true,
          description: datum.brief,
          tags: [],
          organization_id: 0,
          series: "",
          main_image: datum.coverImage,
          canonical_url: "",
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          "api-key": doc.dev,
        },
      }
    );
    console.log(dev_post);
    res.send(1);
  } catch (e) {
    console.log(e);
    console.error(e);
    res.send(0);
  }
};
