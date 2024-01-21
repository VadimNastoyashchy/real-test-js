import { createFile, prepareSpace } from '../utils/support.mjs'

export const prepareHTMLReport = (report, fileName, folderName) => {
  const filePath = prepareSpace(fileName, folderName)
  createFile(`${filePath}.html`, generateHTML(report))
}

const generateHTML = (data) => {
  const report = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Test Report</title>
      <style>
        /* Styles remain the same as before */

        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          margin: 0;
          padding: 20px;
          background-color: #f9f9f9;
        }

        .html-report {
          max-width: 800px;
          margin: 0 auto;
          background-color: #fff;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          border-radius: 5px;
          overflow: hidden;
        }

        .page-header {
          background-color: #4285f4;
          color: #fff;
          padding: 20px;
          text-align: center;
        }

        .page-title {
          margin: 0;
          font-size: 24px;
        }

        .summary-section,
        .tests-section {
          padding: 20px;
        }

        .section-title {
          color: #4285f4;
          font-size: 18px;
          margin-bottom: 10px;
        }

        .summary-table,
        .test-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
        }

        th, td {
          border: 1px solid #ddd;
          padding: 12px;
          text-align: left;
          font-size: 14px;
        }

        th {
          background-color: #f2f2f2;
          font-weight: bold;
        }

        .test-passed {
          background-color: #90EE90;
        }

        .test-failed {
          background-color: #FF5733;
        }

        .error {
          color: #721c24;
          margin: 0;
        }

        .describe-stack {
          margin-top: 10px;
        }

        .describe-item {
          margin-bottom: 10px;
          padding: 12px;
          border: 1px solid #ddd;
          background-color: #f9f9f9;
          border-radius: 5px;
        }

        .describe-title {
          font-weight: bold;
          margin-bottom: 5px;
          color: #4285f4;
        }
      </style>
    </head>
    <body>
      <div class="html-report">
        <header class="page-header">
          <h1 class="page-title">Test Report</h1>
        </header>
        <div class="summary-section">
          <h2 class="section-title">Summary</h2>
          <table class="summary-table">
            <tbody>
              <tr>
                <td>Total Tests:</td>
                <td>${data.length}</td>
              </tr>
              <tr>
                <td>Passed Tests:</td>
                <td>${
                  data.filter((test) => test.errors.length === 0).length
                }</td>
              </tr>
              <tr>
                <td>Failed Tests:</td>
                <td>${data.filter((test) => test.errors.length > 0).length}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="tests-section">
          <h2 class="section-title">Tests</h2>
          <table class="test-table">
            <thead>
              <tr>
                <th>Describe</th>
                <th>Test Name</th>
                <th>Status</th>
                <th>Errors</th>
              </tr>
            </thead>
            <tbody>
              ${data
                .map(
                  (test) => `
                    <tr class="${
                      test.errors.length > 0 ? 'test-failed' : 'test-passed'
                    }">
                      <td>
                        <div class="describe-stack">
                          ${test.describeStack
                            .map(
                              (describeItem) => `
                                <div class="describe-item">
                                  <div class="describe-title">${describeItem.name}</div>
                                </div>
                              `
                            )
                            .join('')}
                        </div>
                      </td>
                      <td>${test.name}</td>
                      <td>${test.errors.length > 0 ? 'Failed' : 'Passed'}</td>
                      <td>
                        ${test.errors
                          .map(
                            (error) =>
                              `<p class="error">${error.message.replace(
                                /\[\d+m/g,
                                ''
                              )}</p>`
                          )
                          .join('')}
                      </td>
                    </tr>
                  `
                )
                .join('')}
            </tbody>
          </table>
        </div>
      </div>
    </body>
    </html>
  `
  return report
}
