"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jonathan = void 0;
const pariah_1 = require("pariah");
const secrets_1 = require("../secrets");
var Jonathan;
(function (Jonathan) {
    Jonathan.Uri = new URL(secrets_1.Secrets.Host);
    class API extends pariah_1.Pariah {
        token;
        constructor(token) {
            super(Jonathan.Uri, { headers: { Authorization: token } });
            this.token = token;
        }
        async authorized() {
            return await this.get.json("/authorized");
        }
        async origin() {
            return await this.get.json("/origin");
        }
        async base64Encode(text) {
            return await this.get.json("/base64/encode", { text });
        }
        async base64Decode(text) {
            return await this.get.json("/base64/decode", { text });
        }
        async binaryEncode(text) {
            return await this.get.json("/binary/encode", { text });
        }
        async binaryDecode(text) {
            return await this.get.json("/binary/decode", { text });
        }
        async tagGet(key) {
            return await this.get.json(`/tags/${key}`);
        }
        async tagPost(key, value) {
            return await this.post.json(`/tags/${key}`, { value });
        }
        async tagDelete(key) {
            return await this.delete.json(`/tags/${key}`);
        }
        async tagList() {
            return await this.get.json("/tags/list");
        }
        async tagInspect() {
            return await this.get.json("/tags/inspect");
        }
        async tagSearch(query) {
            return await this.get.json("/tags/search/:query", {
                ":query": query,
            });
        }
        async todoGet(userId, id) {
            return await this.get.json("/todos/:userId/:id", {
                ":userId": userId,
                ":id": id,
            });
        }
        async todoPost(userId, data) {
            return await this.post.json("/todos/:userId", {
                ":userId": userId,
                data,
            });
        }
        async todoDelete(userId, id) {
            return await this.delete.json("/todos/:userId/:id", {
                ":userId": userId,
                ":id": id,
            });
        }
        async todoList(userId) {
            return await this.get.json("/todos/:userId", {
                ":userId": userId,
            });
        }
        async todoPut(userId, id, data) {
            return await this.put.json("/todos/:userId/:id", {
                ":userId": userId,
                ":id": id,
                data,
            });
        }
        async todoSearch(userId, query) {
            return await this.get.json("/todos/search/:userId/:query", {
                ":userId": userId,
                ":query": query,
            });
        }
        async imageMirror(url, method) {
            return await this.get.buffer("/image/mirror", { url, method });
        }
        async imageSpin(url) {
            return await this.get.buffer("/image/spin", { url });
        }
        async imageColor(size, color) {
            return await this.get.buffer("/image/color/:size/:color", {
                ":size": size,
                ":color": color,
            });
        }
        async imageResize(url, size) {
            return await this.get.buffer("/image/resize/:size", {
                url,
                ":size": size,
            });
        }
        async imageRotate(url, angle) {
            return await this.get.buffer("/image/rotate/:angle", {
                url,
                ":angle": angle,
            });
        }
    }
    Jonathan.API = API;
})(Jonathan = exports.Jonathan || (exports.Jonathan = {}));
