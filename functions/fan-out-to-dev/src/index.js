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

async function post_to(url, data, headers) {
  return axios.post(url, data, headers);
}

async function post_to_dev(datum, key) {
  return post_to(
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
        "api-key": key,
      },
    }
  );
}

async function post_to_med(datum, key) {
  const url = "https://api.medium.com/v1";
  const base_headers = {
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  };

  const { data } = await axios.get(`${url}/me`, { headers: base_headers });
  const uid = data.id;

  return post_to(
    `${url}/users/${uid}/posts`,
    {
      title: datum.title,
      contentFormat: "markdown",
      content: datum.contentMarkdown,
      canonical_url: "",
      tags: "",
      publishStatus: "public",
    },
    base_headers
  );
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
  // console.log(payload);
  const result = await fetch_hn(GET_POST_DETAILS, { slug: payload.slug });
  const datum = result.data.post;
  // console.log(datum);

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
    const dev_post = await post_to_dev(datum, doc.dev);
    console.log(dev_post);
  } catch (e) {
    console.error(e);
  }

  // try {
  //   const med_post = await post_to_med(datum, doc.med);
  //   console.log(med_post);
  // } catch (e) {
  //   console.error(e);
  // }

  res.send(1);
};
