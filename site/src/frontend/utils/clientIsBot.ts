const clientIsBot = /bot|google|baidu|bing|msn|teoma|slurp|yandex/i.test(
  navigator.userAgent,
);
export default clientIsBot;
