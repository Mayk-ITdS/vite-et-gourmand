const changeTheme = (theme: []) => {
  document.body.className = `${{ ...theme }}`;
};
export { changeTheme };
