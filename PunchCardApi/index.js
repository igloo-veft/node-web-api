//const express = require('express');
import express from 'express';
import bodyParser from 'body-parser';
const app = express();

app.use(bodyParser.json());

const companies = {}; //id,name,punchcount
const users = {}; //id,name,email
const userPunches = {}; //userid,companyid,numberofpunches

app.route('/api/companies')
    .get((req, res) => {
        res.json({companies});
    })
    .post((req, res) => {
        const {companyId, companyName, punchCount} = req.body;
        if(!companyName || !companyName.length) {
            res.status(400).json({error: 'Company must have a name'});
        } else if(!punchCount || !punchCount.length) {
            res.status(400).json({error: 'Company must define the number of punches required'});
        } else {
            if(Array.isArray(companies[companyId])) {
                companies[companyId] = [...companies[companyId], {companyName, punchCount}];
            } else {
                companies[companyId] = [{companyName, punchCount}];
            }
            res.json({companies});
        }
    })

app.route('/api/users')
    .get((req, res) => {
        res.json({users})
    })
    .post((req, res) => {
        const {userId, userName, email} = req.body;
        if(!userName || !userName.length) {
            res.status(400).json({error: 'User must have a name'});
        } else if(!email || !email.length) {
            res.status(400).json({error: 'User must have an email'});
        } else {
            users[userId] = [{userName, email}];
            res.json({users});
        }
    })

app.get('/api/companies/:companyId', (req, res) => {
    res.json({companies: companies[companyId]});
})

app.route('/api/users/:userId/punches')
    .get((req,res) => {
        //TODO: find the name of the companies and use that instead of the companyId
        res.json({userPunches: userPunches[userId]});
    })
    .post((req,res) => {
        const companyId = req.body;
        //TODO: check if companyId is already in array for specific userId and add a new punch
        res.json({userPunches: userPunches[userId]});
    })