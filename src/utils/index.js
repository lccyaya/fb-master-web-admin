import md5 from 'blueimp-md5';
import moment from 'moment';
export const randomHex32 = () => {
  return md5(
    [...Array(32)].map(() => Math.floor(Math.random() * 16).toString(16)).join('') +
      '_' +
      new Date().getTime(),
  );
};

export const getScore = (scores) => {
  if (scores && scores.length >= 7) {
    return scores[0] + scores[5] + scores[6];
  } else {
    return 0;
  }
};

// 获取纯文本 from html
export const getTextFromHtml = (html) => {
  return html;
}

const replaceEmpty = /<p>(\s*?)<\/p>|<h[1-6]>(\s*?)<\/h[1-6]>|<br\/>/g;
// 判断是否有内容
export const isHtmlHaveAnyContent = (html) => {
  if (typeof html === 'string') {
    const result = html.replace(replaceEmpty,'');
    return !!result;
  } else if(html) {
    const result = html.toHTML().replace(replaceEmpty,'');
    return !!result;
  }
  return false;
}

// 获取去除掉 style 的文本样式
export const getTextWithoutStyle = (html) => {
  if (html) {
    return html.toHTML().replace(/style=(\"|\')(.*?)(\"|\')/g, '');
  }
  return '';
}

// 清除掉所有的换行样式
export const getTextWidhoutBr = (html) => {
  if (html) {
    // |<br\/>|\/n 注：这个编辑器把 <br/> 和 /n 的空行都换成了 <p> 标签，所以处理p标签和h1 - h6标签就行了
    // console.log(html.toHTML(), 'html.toHTML()')
    const result = html.toHTML().replace(replaceEmpty,'');
    return result.replace(replaceEmpty,'')
    // return result === '' ? '<p></p>' : result;
  }
  return '';
}

// 有换行或者\n的地方保留一个空行 其它清除
export const getTextWidhOnlyBr = (html) => {
  if (html) {
    // <p>(\s*?)<\/p>|<h(1-6)>(\s*?)<\/h(1-6)>
    return html.toHTML().replace(/(<p>(\s*?)<\/p>|<h[1-6]>(\s*?)<\/h[1-6]>)(?=(<p>(\s*?)<\/p>|<h[1-6]>(\s*?)<\/h[1-6]>))/g, '');
    // return html.toHTML().replace(/<p>(\s*?)<\/p>(?=<p>(\s*?)<\/p>)/g, '');
  }
  return '';
}

export const formatDate = (date) => {
  return date ? moment(date * 1000).format('YYYY/MM/DD hh:mm') : '';
};

// 跳转预览页面
export const goProviewOfBraftEditor = ({ content, img, time, title, mobileNoView }) => {
  if (title || img || time) {
    localStorage.setItem('previewObj', JSON.stringify({
      title, img, time: time > 0 ? formatDate(time / 1000) : undefined, mobileNoView
    }));
  } else {
    localStorage.setItem('previewObj', '');
  }
  localStorage.setItem('previewValue', content);
  window.open('/#/preview');
}

// 获取去除掉 首行缩进样式的文本
export const getTextWidhoutTextIndent = (html) => {
  if (html) {
    return html.toHTML().replace(/text-indent\:2em\;/g, '');
  }
  return '';
}