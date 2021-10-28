import express from 'express';
import cors from 'cors';
import path from 'path';
import puppeteer from 'puppeteer';
import "reflect-metadata";

import { baseUrl, publicKey } from '../credentials';
import './database/connection';

import routes from './routes/routes';

const app = express();

app.use(cors());
app.use(express.json());
app.set('view engine', 'pug');
app.set('views', './src/out');
app.use(routes);

app.get('/',(req,res) => {
  res.sendFile(path.resolve('src/page/welcome.html'));
});

app.get('/privacy',(req,res) => {
  res.sendFile(path.resolve('src/page/privacy.html'));
});

app.get('/hashCode',(req, res) => {
  res.sendFile(path.resolve('src/page/hashCode.html'));
});

app.post('/encrypted/:holder/:card/:expireMonth/:expireYear/:secureCode',(req, res) => {
  const { holder, card, expireMonth, expireYear, secureCode  } = req.params;
  const holderFormated = holder.replace(/-/g, ' ');

  async function run() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`${baseUrl}/hashCode`);
    await page.waitForSelector('input[name="publicKey"]');
    await page.type('input[name="publicKey"]', `${publicKey}`);
    await page.type('input[name="holder"]', `${holderFormated}`);
    await page.type('input[name="card"]', `${card}`);
    await page.type('input[name="expireMonth"]', `${expireMonth}`);
    await page.type('input[name="expireYear"]', `${expireYear}`);
    await page.type('input[name="secureCode"]', `${secureCode}`);
    await page.focus('#card');
    await page.click('button[name="startEncrypt"]');

    await page.waitForSelector('p[name="encrypted"]');
    let element = await page.$('p[name="encrypted"]')
    let value = await page.evaluate(el => el.textContent, element)

    res.json({ encrypted: value })

    await browser.close();
  }

  run();
  
});

app.listen(3333,() => {
  console.log('Rodando.');
});