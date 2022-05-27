"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Basic = void 0;
const constants_1 = require("detritus-client/lib/constants");
const constants_2 = require("../../constants");
const markdown_1 = require("../markdown");
var Basic;
(function (Basic) {
    function field(emoji, name, value) {
        return `${emoji} ${markdown_1.Markdown.Format.bold(name.toString())}: ${value}`;
    }
    Basic.field = field;
    function permissionsList(target) {
        const permissions = [];
        for (const key in constants_1.Permissions) {
            const permission = constants_1.Permissions[key];
            if (constants_2.IrrelevantPermissions.includes(permission)) {
                continue;
            }
            if (constants_2.PermissionsText[String(permission)]) {
                if (target.can(permission)) {
                    permissions.push(permission);
                }
            }
        }
        return permissions;
    }
    Basic.permissionsList = permissionsList;
})(Basic = exports.Basic || (exports.Basic = {}));
