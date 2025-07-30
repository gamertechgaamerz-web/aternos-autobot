const fetch = require("node-fetch");
const base = "https://aternos.org";

const credentials = {
  username: "gamertechgaamerz@gmail.com",
  password: "GTStealCraft",
};

const serverId = "GTStealCraft";

async function login() {
  const res = await fetch(`${base}/ajax/account/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `user=${credentials.username}&password=${credentials.password}`,
  });

  const cookies = res.headers.raw()["set-cookie"];
  const cookie = cookies.map((c) => c.split(";")[0]).join("; ");
  return cookie;
}

async function startServer(cookie) {
  const res = await fetch(`${base}/ajax/server/start`, {
    method: "GET",
    headers: { cookie },
  });
  const data = await res.json();
  console.log("Start Request:", data);
}

async function keepAlive(cookie) {
  await fetch(`${base}/ajax/status/${serverId}`, {
    method: "GET",
    headers: { cookie },
  });
  console.log("Pinged Aternos to keep alive.");
}

(async () => {
  const cookie = await login();
  await startServer(cookie);
  setInterval(() => {
    keepAlive(cookie);
  }, 240000);
})();
