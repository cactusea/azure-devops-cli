import got from "got";
import { token, organization, project } from "./env.mjs";

const epicId = process.argv[2];
const personalAccessToken = token;
const Authorization = `Basic ${Buffer.from(`:${personalAccessToken}`).toString(
  "base64"
)}`;
const baseUrl = `https://dev.azure.com/${organization}/${project}/_apis`;

const getWorkItem = async (itemId, index = "") => {
  const workItem = await got
    .get(
      `${baseUrl}/wit/workItems/${itemId}?api-version=7.0&$expand=relations`,
      {
        headers: { Authorization },
      }
    )
    .json();

  console.log(
    `${index}* ${workItem.fields["System.WorkItemType"]} [${workItem.fields["System.State"]}] ${workItem.fields["System.Title"]}`
  );
  index += "  ";

  const childIds = workItem.relations
    .filter((relation) => relation.rel === "System.LinkTypes.Hierarchy-Forward")
    .map((relation) => relation.url.split("/").pop());

  for (const childId of childIds) {
    await getWorkItem(childId, index);
  }
};

await getWorkItem(epicId, "");
