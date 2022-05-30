import { auth } from "./auth";
import { NeedsNoAuth, Sarah } from "./globals";
import { authorized } from "./routes/authorized";
import { base64Decode } from "./routes/base64.decode";
import { base64Encode } from "./routes/base64.encode";
import { binaryDecode } from "./routes/binary.decode";
import { binaryEncode } from "./routes/binary.encode";
import { endpoints } from "./routes/endpoints";
import { imageColor } from "./routes/image.color";
import { imageFlop } from "./routes/image.flop";
import { imageResize } from "./routes/image.resize";
import { imageRotate } from "./routes/image.rotate";
import { imageSpin } from "./routes/image.spin";
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
  if (NeedsNoAuth.includes(req.path)) {
    next();
    return;
  }

  auth(req, res, next);
});

// routes
Sarah.get("/authorized", authorized);
Sarah.get("/origin", origin);
Sarah.get("/endpoints", endpoints);

// tools
Sarah.get("/base64/encode", base64Encode);
Sarah.get("/base64/decode", base64Decode);
Sarah.get("/binary/encode", binaryEncode);
Sarah.get("/binary/decode", binaryDecode);

// tags
Sarah.get("/tags/list", tagList);
Sarah.get("/tags/inspect", tagInspect);
Sarah.get("/tags/:key", tagGet);
Sarah.post("/tags/:key", tagPost);
Sarah.delete("/tags/:key", tagDelete);
Sarah.get("/tags/search/:query", tagSearch);

// image manip
Sarah.get("/image/mirror", imageFlop);
Sarah.get("/image/spin", imageSpin);
Sarah.get("/image/color/:size/:color", imageColor);
Sarah.get("/image/resize/:size", imageResize);
Sarah.get("/image/rotate/:deg", imageRotate);

// Sarah.all('*', fallback);
export { Sarah };
