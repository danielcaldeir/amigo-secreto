"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToday = void 0;
const getToday = () => {
    return Intl.DateTimeFormat('pt-br').format(new Date());
};
exports.getToday = getToday;
//# sourceMappingURL=getToday.js.map