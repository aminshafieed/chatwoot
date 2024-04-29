import { addClasses, removeClasses, toggleClass } from './DOMHelpers';
import { IFrameHelper } from './IFrameHelper';
import { isExpandedView } from './settingsHelper';

export const bubbleSVG =
  'M191.1 224c0-17.62-14.37-32.04-32-32.04l-32.01 0c-35.38 0-64 28.62-64 63.1L63.96 319.6c0 35.38 28.63 64 64.01 64h32c17.63 0 32-14.38 32-32L191.1 224zM159.1 351.6h-32c-17.63 0-32-14.38-32-32V256c0-17.62 14.38-32 32-32l32.02-.0001L159.1 351.6zM383.1 383.6c35.38 0 64.01-28.62 64.01-64l.0026-63.63c0-35.38-28.62-63.1-64-63.1l-31.1 0c-17.63 0-32 14.42-32 32.04l-.0105 127.6c0 17.62 14.38 32 32 32H383.1zM351.1 224l31.1 .0001c17.63 0 32 14.38 32 32V319.6c0 17.62-14.38 32-32 32h-32L351.1 224zM280.2 1.131c-153.5-14.29-276.2 108.1-280.2 254.9l-.0206 15.92C-.0459 280.8 7.155 288 16 288c8.755 0 15.96-7.162 16-15.92l.0838-16.08C35.52 128.6 142.5 20.63 276.9 32.96c116.3 10.68 203.1 112.3 203.1 229.1v169.1c0 26.51-21.49 48-48 48h-83.01c4.081-10.88 4.609-23.54-2.282-36.69c-9.093-17.35-28.04-27.31-47.62-27.31L241.8 416c-23.21 0-44.49 15.69-48.87 38.49C187 485.2 210.4 512 239.1 512l191.1 .0001c44.19 0 80.01-35.82 80.01-79.1V262.9C512 129.6 412.9 13.49 280.2 1.131zM303.1 480H239.1c-8.876 0-16-7.125-16-16s7.126-16 16-16h64.01c8.876 0 16 7.125 16 16S312.9 480 303.1 480z';

export const body = document.getElementsByTagName('body')[0];
export const widgetHolder = document.createElement('div');

export const bubbleHolder = document.createElement('div');
export const chatBubble = document.createElement('button');
export const closeBubble = document.createElement('button');
export const notificationBubble = document.createElement('span');

export const setBubbleText = bubbleText => {
  if (isExpandedView(window.$chatwoot.type)) {
    const textNode = document.getElementById('woot-widget--expanded__text');
    textNode.innerText = bubbleText;
  }
};

export const createBubbleIcon = ({ className, path, target }) => {
  let bubbleClassName = `${className} woot-elements--${window.$chatwoot.position}`;
  const bubbleIcon = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'svg'
  );
  bubbleIcon.setAttributeNS(null, 'id', 'woot-widget-bubble-icon');
  bubbleIcon.setAttributeNS(null, 'width', '24');
  bubbleIcon.setAttributeNS(null, 'height', '24');
  bubbleIcon.setAttributeNS(
    null,
    'viewBox',
    window.$chatwoot.svgIcon?.viewBox
      ? `${window.$chatwoot.svgIcon.viewBox}`
      : '0 0 512 512'
  );
  bubbleIcon.setAttributeNS(null, 'fill', 'none');
  bubbleIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

  const bubblePath = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'path'
  );
  bubblePath.setAttributeNS(null, 'd', path);
  bubblePath.setAttributeNS(null, 'fill', '#FFFFFF');

  bubbleIcon.appendChild(bubblePath);

  const bubbleClassIcon = document.createElement('span');
  bubbleClassIcon.setAttribute(
    'class',
    `d-flex justify-content-center align-items-center text-white ${window.$chatwoot.fontIcon}`
  );
  if (window.$chatwoot.fontIcon) target.appendChild(bubbleClassIcon);
  else target.appendChild(bubbleIcon);

  if (isExpandedView(window.$chatwoot.type)) {
    const textNode = document.createElement('div');
    textNode.id = 'woot-widget--expanded__text';
    textNode.innerText = '';
    target.appendChild(textNode);
    bubbleClassName += ' woot-widget--expanded';
  }

  target.className = bubbleClassName;
  target.title = `${window.$chatwoot.bubbleTooltip}`;
  return target;
};

export const createBubbleHolder = hideMessageBubble => {
  if (hideMessageBubble) {
    addClasses(bubbleHolder, 'woot-hidden');
  }
  addClasses(bubbleHolder, 'woot--bubble-holder');
  body.appendChild(bubbleHolder);
};

export const createNotificationBubble = () => {
  addClasses(notificationBubble, 'woot--notification');
  return notificationBubble;
};

export const onBubbleClick = (props = {}) => {
  const { toggleValue } = props;
  const { isOpen } = window.$chatwoot;
  if (isOpen !== toggleValue) {
    const newIsOpen = toggleValue === undefined ? !isOpen : toggleValue;
    window.$chatwoot.isOpen = newIsOpen;

    toggleClass(chatBubble, 'woot--hide');
    toggleClass(closeBubble, 'woot--hide');
    toggleClass(widgetHolder, 'woot--hide');
    IFrameHelper.events.onBubbleToggle(newIsOpen);

    if (!newIsOpen) {
      chatBubble.focus();
    }
  }
};

export const onClickChatBubble = () => {
  bubbleHolder.addEventListener('click', onBubbleClick);
};

export const addUnreadClass = () => {
  const holderEl = document.querySelector('.woot-widget-holder');
  addClasses(holderEl, 'has-unread-view');
};

export const removeUnreadClass = () => {
  const holderEl = document.querySelector('.woot-widget-holder');
  removeClasses(holderEl, 'has-unread-view');
};
