const reqEvent = (event) => require(`../eventss/${event}`);
module.exports = client => {
  client.on('ready', () => reqEvent('ready')(client));

};
