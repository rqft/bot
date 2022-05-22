import { Secrets } from "../secrets";
import { auth } from "./auth";
import { NeedsNoAuth, Sarah } from "./globals";
import { authorized } from "./routes/authorized";
import { base64Decode } from "./routes/base64.decode";
import { base64Encode } from "./routes/base64.encode";
import { binaryDecode } from "./routes/binary.decode";
import { binaryEncode } from "./routes/binary.encode";
import { imageFlop } from "./routes/image.flop";
import { origin } from "./routes/origin";
import { tagDelete } from "./routes/tag.delete";
import { tagGet } from "./routes/tag.get";
import { tagInspect } from "./routes/tag.inspect";
import { tagList } from "./routes/tag.list";
import { tagPost } from "./routes/tag.post";
import { tagSearch } from "./routes/tag.search";

// middleware
Sarah.use((req, res, next) => {
  res.contentType("application/json");
  if (NeedsNoAuth.includes(req.path) || Secrets.Mode === "dev") {
    next();
    return;
  }

  auth(req, res, next);
});

// routes
Sarah.get("/authorized", authorized);
Sarah.get("/origin", origin);
Sarah.get("/base64/encode", base64Encode);
Sarah.get("/base64/decode", base64Decode);
Sarah.get("/binary/encode", binaryEncode);
Sarah.get("/binary/decode", binaryDecode);

Sarah.get("/tags/list", tagList);
Sarah.get("/tags/inspect", tagInspect);
Sarah.get("/tags/:key", tagGet);
Sarah.post("/tags/:key", tagPost);
Sarah.delete("/tags/:key", tagDelete);
Sarah.get("/tags/search/:query", tagSearch);

Sarah.get("/image/mirror", imageFlop)
// Sarah.all('*', fallback);
export { Sarah };
