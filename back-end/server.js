const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

// parse application/json
app.use(bodyParser.json());

// connect to the database
mongoose.connect('mongodb://localhost:27017/todo', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Create a scheme for projects
const projectSchema = new mongoose.Schema({
  name: String,
  problem: String,
});

// Create a model for projects
const Project = mongoose.model('Project', projectSchema);

// Create a project
app.post('/api/projects', async (req, res) => {
  const project = new Project({
    name: req.body.name,
    problem: req.body.problem,
  });
  try {
    await project.save();
    res.send(project);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all projects
app.get('/api/projects', async (req, res) => {
  try {
    let projects = await Project.find();
    res.send(projects);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/projects/:projectID', async (req, res) => {
    try {
        let project = await Project.findOne({_id:req.params.projectID});
        if (!project) {
            res.send(404);
            return;
        }
        await project.delete();
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.put('/api/projects/:projectID', async (req, res) => {
    try {
      let project = await Project.findOne({_id:req.params.projectID});
      if (!project) {
          res.send(404);
          return;
      }
      project.name = req.body.name;
      project.problem = req.body.problem;
      await project.save();
      res.send(item);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
