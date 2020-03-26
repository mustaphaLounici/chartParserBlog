import React from "react"

export const chartParser = content => {
  var contentInArrayFormat = content.split(
    /(\{\{ (?:\S*?) (?:\S*?) (?:\S*?) \}\})/g
  ) // https://regex101.com/r/leDxXK/1
  var contentWithCharts = []
  //   console.log({ content, contentInArrayFormat })

  const chartTagRegEx = /\{\{ (\S*?) (\S*?) (\S*?) \}\}/g

  for (let paragraph of contentInArrayFormat) {
    if (paragraph.match(/\{\{ (\S*?) (\S*?) (\S*?) \}\}/g)) {
      let x = paragraph.match(/\{\{ (\S*?) (\S*?) (\S*?) \}\}/)
      const source = x[1]
      const topic = x[2]
      const section = x[3]
      console.log({ source, topic, section })

      contentWithCharts.push({
        type: "chart",
        iframeUrl: `https://unruffled-mcclintock-08bc5f.netlify.com/vis/${source}/${topic}/${section}`,
        html: (
          <div>
            i am a react node {source} {topic} {section}
          </div>
        ),
      })
    } else {
      contentWithCharts.push({
        type: "html",
        html: paragraph
          .toString()
          .replace(/\\"/g, "")
          .replace(/\\n/g, ""),
      })
    }
  }

  return contentWithCharts
}
