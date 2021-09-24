const fs = require('fs');

const configs = {
  auto: false,
  fileContent: `
     ## 这里是标题
  `,
  template: [
    {
      path: '/pscWorld',
      fileContent: `
      ## 这里是标题
    `,
    },
    {
      path: '/template',
      fileContent: `
      ## 这里是标题
    `,
    },
  ],
};
const fileName = 'index.md';
function isDir(file) {
  return `${process.cwd()}/${file}`.split('.').length !== 2 && !(/\./.test(`${process.cwd()}/${file}`));
}

function writeFile(path, content) {
  fs.writeFile(`${path}/${fileName}`, content, (err) => {
    if (err) {
      console.log('创建失败');
    } else {
      console.log('创建成功');
    }
  });
}

function readDir() {
  // eslint-disable-next-line consistent-return
  const dir = [];
  const files = fs.readdirSync(process.cwd());
  files.forEach((file) => {
    if (isDir(file)) {
      dir.push(file);
    }
  });
  return dir;
}

/**
 * 主要函数
 */
function run() {
  if (configs.auto) {
    const dirs = readDir();
    for (let i = 0; i < dirs.length; i++) {
      if (dirs.length === configs.template) {
        const { fileContent } = configs.template[i];
        writeFile(`${process.cwd()}/${dirs[i]}`, fileContent);
      } else {
        writeFile(`${process.cwd()}/${dirs[i]}`, configs.fileContent);
      }
    }
  } else {
    for (let i = 0; i < configs.template; i++) {
      const { fileContent, path } = configs.template[i];
      writeFile(`${process.cwd()}/${path}`, fileContent);
    }
  }
}

run();
