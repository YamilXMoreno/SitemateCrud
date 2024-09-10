const express = require('express');
const Issue = require('../Models/IssueModel'); // Adjust the path if necessary
const { issuesValidationRules, validate } = require('../Middleware/ValidationRules');
const router = express.Router(); 

// GET all issues
router.get('/', async (req, res) => {
    try {
        const issues = await Issue.find();
        res.json(issues);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving issues', error });
    }
});

// GET a single issue by ID
router.get('/issue/:id', async (req, res) => {
    try {
        const issue = await Issue.findOne({ issueId: req.params.id });
        if (!issue) {
            return res.status(404).json({ message: 'Issue not found' });
        }
        res.json(issue);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving the issue', error });
    }
});

// POST a new issue
router.post('/issue/add', issuesValidationRules(), validate, async (req, res) => {
    try {
        const { issueId, title, description } = req.body;

        const newIssue = new Issue({
            issueId,
            title,
            description
        });

        await newIssue.save();
        res.status(201).json(newIssue);
    } catch (error) {
        res.status(500).json({ message: 'Error adding the issue', error });
    }
});

// UPDATE an issue by ID
router.post('/issue/edit/:id', issuesValidationRules(), validate, async (req, res) => {
    try {
        const { title, description } = req.body;

        const updatedIssue = await Issue.findOneAndUpdate(
            { issueId: req.params.id },
            { title, description },
            { new: true, runValidators: true }
        );

        if (!updatedIssue) {
            return res.status(404).json({ message: 'Issue not found' });
        }

        res.json(updatedIssue);
    } catch (error) {
        res.status(500).json({ message: 'Error updating the issue', error });
    }
});

// DELETE an issue by ID
router.delete('/issue/:id', async (req, res) => {
    try {
        const deletedIssue = await Issue.findOneAndDelete({ issueId: req.params.id });

        if (!deletedIssue) {
            return res.status(404).json({ message: 'Issue not found' });
        }

        res.json({ message: 'Issue deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting the issue', error });
    }
});

module.exports = router;
