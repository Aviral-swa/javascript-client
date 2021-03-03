export const parseTreeData = (data) => {
  const tree = [];
  const record = data.map((ele) => (
    { ...ele }
  ));
  record.forEach((node) => {
    if (!node.parent) return tree.push(node);

    const parentIndex = record.findIndex((el) => el.name === node.parent);
    if (!record[parentIndex].children) {
      // eslint-disable-next-line no-return-assign
      return record[parentIndex].children = [node];
    }
    return record[parentIndex].children.push(node);
  });
  return tree;
};
