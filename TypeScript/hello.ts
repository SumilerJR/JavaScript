function toBoolean(something: any): boolean {
    return something as boolean;
}

toBoolean(1);
// 返回值为 1