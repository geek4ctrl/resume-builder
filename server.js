const express = require("express");
const bodyParser = require("body-parser");
const pdfMakePrinter = require('pdfmake/src/printer');
const base64ToArrayBuffer = require('base64-arraybuffer');
const cors = require("cors");

const app = express();

app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (request, response) => {
    response.send("Hi there");
});

app.get("/fetch-pdf", (request, response) => {

    try {
        const docDefinition = {
            content: "Dummy content", defaultStyle: {
                font: 'Roboto'
            }
        };

        const fontDescriptors = {
            Roboto: {
                normal: 'font/roboto/Roboto-Regular.ttf',
                bold: 'font/roboto/Roboto-Regular.ttf',
                italics: 'font/roboto/Roboto-Regular.ttf',
                bolditalics: 'font/roboto/Roboto-Regular.ttf'
            }
        };
        const printer = new pdfMakePrinter(fontDescriptors);
        const doc = printer.createPdfKitDocument(docDefinition);

        let chunks = [];
        let result;

        doc.on('data', (chunk) => {
            chunks.push(chunk);
        });

        doc.on('end', () => {
            result = Buffer.concat(chunks);
            console.log("PDF successfully created and stored");

            response.send(result);
        });

        doc.end();

    } catch (err) {
        throw (err);
    }

});

app.post('/create-pdf', (req, res) => {

    const info = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phonenumber: req.body.phonenumber,
        website: req.body.website,
        github: req.body.github,
        linkedin: req.body.linkedin,
        twitter: req.body.twitter,
        facebook: req.body.facebook,
        instagram: req.body.facebook,

        college: req.body.college,
        collegeQualification: req.body.collegeQualification,
        collegeDateFrom: req.body.collegeDateFrom,
        collegeDateTo: req.body.collegeDateTo,
        collegeDescription: req.body.collegeDescription,
        school: req.body.school,
        schoolQualification: req.body.schoolQualification,
        schoolDateFrom: req.body.schoolDateFrom,
        schoolDateTo: req.body.schoolDateTo,
        schoolDescription: req.body.schoolDescription,

        projectTitle1: req.body.projectTitle1,
        projectLink1: req.body.projectLink1,
        projectDescription1: req.body.projectDescription1,
        projectTitle2: req.body.projectTitle2,
        projectLink2: req.body.projectLink2,
        projectDescription2: req.body.projectDescription2,
        projectTitle3: req.body.projectTitle3,
        projectLink3: req.body.projectLink3,
        projectDescription3: req.body.projectDescription3,

        experienceOrganisation1: req.body.experienceOrganisation1,
        experiencePosition1: req.body.experiencePosition1,
        experienceDuration1: req.body.experienceDuration1,
        experienceDescription1: req.body.experienceDescription1,
        experienceOrganisation2: req.body.experienceOrganisation2,
        experiencePosition2: req.body.experiencePosition2,
        experienceDuration2: req.body.experienceDuration2,
        experienceDescription2: req.body.experienceDescription2,

        skill1: req.body.skill1,
        skill2: req.body.skill2,
        skill3: req.body.skill3,
        skill4: req.body.skill4,
        skill5: req.body.skill5,
        skill6: req.body.skill6,
        interest1: req.body.interest1,
        interest2: req.body.interest2,
        interest3: req.body.interest3,
        interest4: req.body.interest4,
        interest5: req.body.interest5,
        interest6: req.body.interest6
    }

    const htmlTemplate = `
                        <html>
                            <body>
                                <div class="rela-block caps greyed">Testing</div>
                                <h3 class="mb-0">${info.email}</h3>
                                <p class="text-muted light mt-0 mb-1">
                                        ${info.firstname}
                                </p>
                                <p class="text-muted light mt-0 mb-1">
                                        ${info.lastname}
                                </p>
                            </body>
                        </html>
                        `;

    return res.status(201).send({
        success: 'true',
        message: 'PDF printed successfully',
        info
    })

});

app.listen(3000, () => {
    console.log("Listen on the port 3000");
});
