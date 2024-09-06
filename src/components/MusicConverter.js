import React, { useState, useRef } from "react";
import JSZip from "jszip";
import ABCJS from "abcjs";
import $ from "jquery";
import SheetEditor from "./SheetEditor";
import { vertaal } from "xml2abc";
import { Button } from "@mui/material";
import { AddMxlFile } from "../util/ApiFunction";

var theMusicXMLImportSettings = localStorage.musicXMLImportOptionsV6;

if (theMusicXMLImportSettings) {
  gMusicXMLImportOptions = JSON.parse(theMusicXMLImportSettings);
} else {
  resetMusicXMLImportOptions();
}

//
// Configure the MusicXML import
//
var gMusicXMLImportOptions = {
  b: 4,
  n: 0,
  c: 0,
  v: 0,
  d: 4,
  x: 0,
  noped: 0,
  p: "",
  v1: 0,
  stm: 0,
  s: 0,
  t: 0,
  u: 0,
  v: 0,
  v1: 0,
  mnum: -1,
  m: 1,
  addq: 1,
  q: 100,
  addstavenum: 0,
};
function resetMusicXMLImportOptions() {
  gMusicXMLImportOptions = {
    b: 4,
    n: 0,
    c: 0,
    v: 0,
    d: 4,
    x: 0,
    noped: 0,
    p: "",
    v1: 0,
    stm: 0,
    s: 0,
    t: 0,
    u: 0,
    v: 0,
    v1: 0,
    mnum: -1,
    m: 1,
    addq: 1,
    q: 100,
    addstavenum: 0,
  };
}

function setMusicXMLOptions() {
  gMusicXMLImportOptions.x = $("#musicxml_nlb").prop("checked") ? 1 : 0;

  // If allowing linebreaks, can't have end-of-stave numbers
  if (gMusicXMLImportOptions.x == 0) {
    gMusicXMLImportOptions.addstavenum = 0;
    $("#musicxml_addstavenum").prop("checked", false);
  } else {
    gMusicXMLImportOptions.addstavenum = $("#musicxml_addstavenum").prop(
      "checked"
    )
      ? 1
      : 0;
  }

  gMusicXMLImportOptions.u = $("#musicxml_unfld").prop("checked") ? 1 : 0;
  gMusicXMLImportOptions.b = parseInt($("#musicxml_bpl").val() || 4);
  gMusicXMLImportOptions.n = parseInt($("#musicxml_cpl").val() || 0);
  gMusicXMLImportOptions.c = parseInt($("#musicxml_crf").val() || 0);
  gMusicXMLImportOptions.d = parseInt($("#musicxml_den").val() || 4);
  gMusicXMLImportOptions.m = parseInt($("#musicxml_midi").val() || 0);
  gMusicXMLImportOptions.noped = $("#musicxml_noped").prop("checked") ? 1 : 0;
  gMusicXMLImportOptions.v1 = $("#musicxml_v1").prop("checked") ? 1 : 0;
  gMusicXMLImportOptions.stm = $("#musicxml_stems").prop("checked") ? 1 : 0;
  gMusicXMLImportOptions.mnum = parseInt($("#musicxml_mnum").val() || -1);
  gMusicXMLImportOptions.addq = $("#musicxml_addq").prop("checked") ? 1 : 0;
  gMusicXMLImportOptions.q = parseInt($("#musicxml_q").val() || 100);
}

//
// Inject a Q tag into the ABC
//
function InjectQTag(theTune, theTempo) {
  var theLines = theTune.split("\n");

  var nLines = theLines.length;

  // Does the tune already have a Q: tag at the start of a line?
  for (var j = 0; j < nLines; ++j) {
    if (theLines[j].trim().indexOf("Q:") == 0) {
      // Yes, nothing to inject
      return theTune;
    }
  }

  // No Q: tag found, find the M: tag, and inject there

  // Find the Meter
  var theMeterLine = "";

  var bFoundMeter = false;

  // Find the first line of the tune that has measure separators
  for (var j = 0; j < nLines; ++j) {
    theMeterLine = theLines[j];

    if (theMeterLine.trim().indexOf("M:") == 0) {
      bFoundMeter = true;

      // Put it after the M: tag line if not at the end of the ABC
      if (j < nLines - 1) {
        theMeterLine = theLines[j + 1];
      }
      break;
    }
  }

  if (bFoundMeter) {
    var meterIndex = theTune.indexOf(theMeterLine);

    var leftSide = theTune.substring(0, meterIndex);
    var rightSide = theTune.substring(meterIndex);

    theTune = leftSide + "Q:" + theTempo + "\n" + rightSide;
  } else {
    // Just in case there is no M: tag. Almost certainly never will happen.
    // In this case, put it behind the K: tag
    // If no K: tag, just punt

    // Find the Key
    var theKeyLine = "";

    var bFoundKey = false;

    // Find the first line of the tune that has measure separators
    for (var j = 0; j < nLines; ++j) {
      theKeyLine = theLines[j];

      if (theKeyLine.trim().indexOf("K:") == 0) {
        bFoundKey = true;
        break;
      }
    }

    if (bFoundKey) {
      var keyIndex = theTune.indexOf(theKeyLine);

      var leftSide = theTune.substring(0, keyIndex);
      var rightSide = theTune.substring(keyIndex);

      theTune = leftSide + "Q:" + theTempo + "\n" + rightSide;
    }
  }

  return theTune;
}

/*
 * Title Caps
 *
 * Ported to JavaScript By John Resig - http://ejohn.org/ - 21 May 2008
 * Original by John Gruber - http://daringfireball.net/ - 10 May 2008
 * License: http://www.opensource.org/licenses/mit-license.php
 */

function doTitleCaps(title) {
  var small =
    "(a|an|and|as|at|but|by|en|for|if|in|of|on|or|the|to|v[.]?|via|vs[.]?)";
  var punct = "([!\"#$%&'()*+,./:;<=>?@[\\\\\\]^_`{|}~-]*)";

  function titleCaps(title) {
    var parts = [],
      split = /[:.;?!] |(?: |^)["Ò]/g,
      index = 0;

    while (true) {
      var m = split.exec(title);

      parts.push(
        title
          .substring(index, m ? m.index : title.length)
          .replace(/\b([A-Za-z][a-z.'Õ]*)\b/g, function (all) {
            return /[A-Za-z]\.[A-Za-z]/.test(all) ? all : upper(all);
          })
          .replace(RegExp("\\b" + small + "\\b", "ig"), lower)
          .replace(
            RegExp("^" + punct + small + "\\b", "ig"),
            function (all, punct, word) {
              return punct + upper(word);
            }
          )
          .replace(RegExp("\\b" + small + punct + "$", "ig"), upper)
      );

      index = split.lastIndex;

      if (m) parts.push(m[0]);
      else break;
    }

    return parts
      .join("")
      .replace(/ V(s?)\. /gi, " v$1. ")
      .replace(/(['Õ])S\b/gi, "$1s")
      .replace(/\b(AT&T|Q&A)\b/gi, function (all) {
        return all.toUpperCase();
      });
  }

  function lower(word) {
    return word.toLowerCase();
  }

  function upper(word) {
    return word.substr(0, 1).toUpperCase() + word.substr(1);
  }

  return titleCaps(title);
}

// Split the ABC music only at the linebreaks
function replaceLineBreaks(input, lbChar) {
  // Split the input text into an array of lines
  const lines = input.split("\n");

  // Initialize an array to hold the combined lines
  let combinedLines = [];
  let currentLine = "";

  var gotLB = false;
  // Loop through each line in the input text
  for (let line of lines) {
    // Check if the line starts with a tag
    if (
      !/^(X:|T:|M:|K:|L:|Q:|W:|Z:|R:|C:|A:|O:|P:|N:|G:|H:|B:|D:|F:|S:|I:|V:|w:|%)/.test(
        line
      )
    ) {
      if (line.indexOf(lbChar) !== -1) {
        gotLB = true;
        break;
      }
    }
  }

  // Line breaks requested, but none detected, just return the original split text
  if (!gotLB) {
    return input;
  }

  // Line breaks detected, pass through the tag lines but combine and split the ABC notes

  // Loop through each line in the input text
  for (let line of lines) {
    // Check if the line starts with A:, B:, C:, or %
    if (
      /^(X:|T:|M:|K:|L:|Q:|W:|Z:|R:|C:|A:|O:|P:|N:|G:|H:|B:|D:|F:|S:|I:|V:|w:|%)/.test(
        line
      )
    ) {
      // If currentLine is not empty, push it to combinedLines and reset it
      if (currentLine) {
        combinedLines.push(currentLine);
        currentLine = "";
      }
      // Push the current line as it starts with a tag
      combinedLines.push(line);
    } else {
      // Append the line to currentLine if it doesn't start with a tag
      currentLine += (currentLine ? " " : "") + line;
    }
  }

  // Push the last combined line if it exists
  if (currentLine) {
    combinedLines.push(currentLine);
  }

  var newLines = [];

  // Iterate over each line
  const modifiedLines = combinedLines.map((line) => {
    // Check if the line is a tag
    if (isTagLine(line)) {
      // Return the line unchanged if it matches the condition
      return newLines.push(line);
    } else {
      var theSplits = splitTextAtLineBreak(line, lbChar);
      console.log(theSplits);

      var nSplits = theSplits.length;

      for (var j = 0; j < nSplits; ++j) {
        var thisSplit = theSplits[j];
        thisSplit = thisSplit.trim();
        if (thisSplit !== "") {
          // Include the split marks at the end of the lines
          newLines.push(thisSplit);
        }
      }
    }
  });

  return newLines.join("\n");
}

function removeLinesStartingWithILinebreak(text) {
  // Split the text into an array of lines
  let lines = text.split("\n");

  // Filter out lines that start with 'I:linebreak'
  lines = lines.filter((line) => !line.startsWith("I:linebreak"));

  // Join the remaining lines back into a single string
  return lines.join("\n");
}

// Does the lines start with an ABC tag or %
function isTagLine(text) {
  const prefixes = [
    "X:",
    "T:",
    "M:",
    "K:",
    "L:",
    "Q:",
    "W:",
    "Z:",
    "R:",
    "C:",
    "A:",
    "O:",
    "P:",
    "N:",
    "G:",
    "H:",
    "B:",
    "D:",
    "F:",
    "S:",
    "I:",
    "V:",
    "%",
  ];
  for (const prefix of prefixes) {
    if (text.startsWith(prefix)) {
      return true;
    }
  }
  return false;
}

function splitTextAtLineBreak(input, lbChar) {
  // Split the input text at each $ character
  const splits = input.split(lbChar);

  // Initialize an array to hold the resulting substrings
  let resultArray = [];

  // Loop through each split substring
  for (let split of splits) {
    // Trim the split substring to remove any leading or trailing whitespace
    let trimmedSplit = split.trim();

    // Push the trimmed substring to the result array if it's not empty
    if (trimmedSplit) {
      resultArray.push(trimmedSplit);
    }
  }

  return resultArray;
}

//
// Import MusicXML format
//
function importMusicXML(theXML, fileName) {
  var xmldata = $.parseXML(theXML); // abc_code is a (unicode) string with one abc tune.

  // var options = { u:0, b:4, n:0,  // unfold repeats (1), bars per line, chars per line
  //                 c:0, v:0, d:0,  // credit text filter level (0-6), no volta on higher voice numbers (1), denominator unit length (L:)
  //                 m:0, x:0, t:0,  // no midi, minimal midi, all midi output (0,1,2), no line breaks (1), perc, tab staff -> voicemap (1)
  //                 v1:0, noped:0,  // all directions to first voice of staff (1), no pedal directions (1)
  //                 stm:0,          // translate stem elements (stem direction)
  //                 p:'', s:0,   // page format: scale (1.0), width, left- and right margin in cm, shift note heads in tablature (1)
  //                 addstavenum:1 };  // Add stave numbers at the end of the staves

  // Suppress stave measure numbers if doing linebreaks
  var replacedStaveNum = false;

  if (
    gMusicXMLImportOptions.x == 0 &&
    gMusicXMLImportOptions.addstavenum == 1
  ) {
    replacedStaveNum = true;
    gMusicXMLImportOptions.addstavenum = 0;
  }

  var result = vertaal(xmldata, gMusicXMLImportOptions);
  console.log(result[0]);

  if (replacedStaveNum) {
    gMusicXMLImportOptions.addstavenum = 1;
  }

  var abcText = result[0]; // the translation (string)

  // Strip out extra clef indications
  abcText = abcText.replaceAll("[K:treble]", "");
  abcText = abcText.replaceAll("[K:alto]", "");
  abcText = abcText.replaceAll("[K:alto1]", "");
  abcText = abcText.replaceAll("[K:alto2]", "");
  abcText = abcText.replaceAll("[K:tenor]", "");
  abcText = abcText.replaceAll("[K:bass]", "");
  abcText = abcText.replaceAll("[K:bass3]", "");

  // Inject Q: tag?
  if (gMusicXMLImportOptions.addq == 1) {
    var theTempoToInject = gMusicXMLImportOptions.q;

    abcText = InjectQTag(abcText, theTempoToInject);
  }

  // If no title in the XML after conversion, inject the filename instead
  if (abcText.indexOf("T:Title") != -1) {
    // Strip the extension
    fileName = fileName.replace(".mxl", "");
    fileName = fileName.replace(".xml", "");
    fileName = fileName.replace(".musicxml", "");
    fileName = fileName.replace(".MXL", "");
    fileName = fileName.replace(".XML", "");
    fileName = fileName.replace(".MUSICXML", "");

    // Replace any _ or - with spaces
    fileName = fileName.replaceAll("_", " ");
    fileName = fileName.replaceAll("-", " ");
    fileName = fileName.replaceAll("  ", " ");

    // Intelligent title capitalize
    fileName = doTitleCaps(fileName);

    abcText = abcText.replace("T:Title", "T:" + fileName);
  }

  // MAE 15 Jun 2024 - Is there a linebreak character request
  var searchRegExp = /^I:linebreak.*$/m;

  // Detect linebreak character request
  var doLBReplacement = false;
  var gotLineBreakRequest = abcText.match(searchRegExp);
  var theLBchar = "";

  if (gotLineBreakRequest && gotLineBreakRequest.length > 0) {
    theLBchar = gotLineBreakRequest[0].replace("I:linebreak", "");

    theLBchar = theLBchar.trim();

    if (theLBchar.length > 0 && (theLBchar == "!" || theLBchar == "$")) {
      doLBReplacement = true;
      theLBchar = theLBchar[0];
    }
  }

  // // Do the line break replacement?
  // if (doLBReplacement) {
  //   console.log("Doing LB replacement, theLBchar: " + theLBchar);
  //   abcText = replaceLineBreaks(abcText, theLBchar);
  // }

  // Remove the linebreak request from the ABC
  abcText = removeLinesStartingWithILinebreak(abcText);

  return abcText;
}

//
// Is a file XML data
//
function isXML(theText) {
  var xs = theText.slice(0, 100); // only look at the beginning of the file
  if (xs.indexOf("<?xml") !== -1) {
    return true;
  }

  return false;
}

const MusicConverter = ({mxlFile}) => {
  const abcRef = useRef(null);
  const audioRef = useRef(null);
  const visualObjRef = useRef(null);
  const synthControlRef = useRef(null);
  const [abcNotation, setAbcNotation] = useState("");
  const [error, setError] = useState(null);
  const notationRef = useRef(null);
  const gTheABC = useRef(null);
  const [Rightnotes, setRightnotes] = useState([]);
  const [Leftnotes, setLeftnotes] = useState([]);


  //
  // Reset the focus back to the ABC and set an initial selection
  //
  
  function FocusABC() {
    // Refocus back on the ABC
    gTheABC.current.focus();

    // Set the selection to the start of the tune
    gTheABC.selectionStart = 0;
    gTheABC.selectionEnd = 0;

    // Scroll it to the top
    gTheABC.current.scrollTo(0, 0);
  }

  //
  // Clean "smart quotes" from the ABC
  //
  function CleanSmartQuotes() {
    var val = gTheABC.value;

    // Double quotes
    val = val.replaceAll("“", '"');
    val = val.replaceAll("”", '"');

    // Single quotes
    val = val.replaceAll("‘", "'");
    val = val.replaceAll("’", "'");

    gTheABC.value = val;
  }

  //
  // Count the tunes in the text area
  //
  function CountTunes() {
    // Count the tunes in the text area
    var theNotes = gTheABC.value;

    var theTunes = theNotes.split(/^X:.*$/gm);

    var nTunes = theTunes.length - 1;

    return nTunes;
  }

  function DoReadCommon(theText, doAppend) {
    // Handle appending for drag and drop
    if (doAppend) {
      var nTunes = CountTunes();

      if (nTunes > 0) {
        // Do we need to add a new line before the next tune?
        var theLength = gTheABC.value.length;

        if (gTheABC.value.substring(theLength - 1) !== "\n") {
          gTheABC.value += "\n";
        }

        gTheABC.value += "\n";
      }

      gTheABC.value += theText;

      CleanSmartQuotes();
    } else {
      gTheABC.value = theText;

      CleanSmartQuotes();
    }

    // Refocus back on the ABC
    FocusABC();

    processMusicXml(gTheABC.current.value);
  }

  function xoaComments(abcString) {
    // Loại bỏ các comment bắt đầu bằng dấu '%' và các dòng trống
    return abcString
      .split("\n")
      .filter((line) => !line.trim().startsWith("%"))
      .join("\n");
  }

  function extractNotesFromABC(theText) {
    const vString = xoaComments(theText);
    // Tách phần V:1 và V:2
    const tayTrai = [];
    const tayPhai = [];

    // Hàm loại bỏ các ký hiệu dạng !{...}! trong phần tử
    const removeNumberedSymbols = (str) =>
      str.replace(/!\{[^}]*\}!/g, "").replace(/!\S+?!/g, "").replace(/"\S+?"/g, "");

    // Hàm phân tách phần tử thành {note, duration}
    const parseNoteDuration = (element) => {
      // Loại bỏ comment trước khi phân tích cú pháp
      element = removeNumberedSymbols(element);

      // const match1 = element.match(
      //   /^([\^_=]?[_]?b?[a-gA-GzZ][,']*)(\/(\d+)|(\d+))?$/
      // );
      // if (match1) {
      //   return {
      //     note1: match1[1],
      //     note2: "",
      //     note3: "",
      //     duration: match1[2] || "1", // Mặc định duration là 1 nếu không có
      //   };
      // }

      // Biểu thức chính quy để phân tách nốt nhạc và độ dài
      const match1 = element.match(
        /^(\.)?([\^_=]?[_]?b?[a-gA-GzZ][,']*)(\d*(?:\/\d+)?)$/
      );

      if (match1) {
        const note = match1[2]; // Phần nốt nhạc
        let duration = match1[3]; // Phần độ dài

        if (duration === "") {
          if(match1[1] === ""){
          duration = "1";
          }else{
          duration = "3/2";
          }
          // Nếu không có phần độ dài, mặc định là 1
          duration = "1";
        } else if (duration.includes("/")) {
          // Nếu phần độ dài chứa "/", ví dụ "3/2"
          const [numerator, denominator] = duration.split("/").map(Number);
          duration = (numerator / denominator).toString();
        }

        return {
          note1: note,
          note2: "",
          note3: "",
          duration: duration,
        };
      }

      // Biểu thức chính quy để phân tách các phần tử
      const match2 = element.match(
        /^\[([\^_=]?[_]?b?[a-gA-GzZ][,']*)([\^_=]?[_]?b?[a-gA-GzZ][,']*)\](\d*(?:\/\d+)?)?$/
      );

      if (match2) {
        return {
          note1:
            match2[1]
              .split(",")
              .map((note) => note.trim())
              .filter((note) => note)[0] || "",
          note2:
            match2[2]
              .split(",")
              .map((note) => note.trim())
              .filter((note) => note)[0] || "",
          note3: "",
          duration: match2[3] || "1", // Mặc định duration là 1 nếu không có
        };
      }
      // Biểu thức chính quy để phân tách các phần tử
      const match3 = element.match(
        /^\[([\^_=]?[_]?b?[a-gA-GzZ][,']*)([\^_=]?[_]?b?[a-gA-GzZ][,']*)([\^_=]?[_]?b?[a-gA-GzZ][,']*)\](\d*(?:\/\d+)?)?$/
      );

      if (match3) {
        return {
          note1:
            match3[1]
              .split(",")
              .map((note) => note.trim())
              .filter((note) => note)[0] || "",
          note2:
            match3[2]
              .split(",")
              .map((note) => note.trim())
              .filter((note) => note)[0] || "",
          note3:
            match3[3]
              .split(",")
              .map((note) => note.trim())
              .filter((note) => note)[0] || "",
          duration: match3[4] || "1", // Mặc định duration là 1 nếu không có
        };
      }

      // Tách chuỗi thành các phần tử note/number
      const notesArray = element.match(
        /[\^_=]?[_]?b?[a-gA-GzZ][,']*(?:\/\d+)?/g
      );

      if (notesArray) {
        return notesArray.map((note) => {
          const match = note.match(
            /^([\^_=]?[_]?b?[a-gA-GzZ][,']*)(\d*(?:\/\d+)?)$/
          );

          if (match) {
            return {
              note1: match[1],
              note2: "",
              note3: "",
              duration: match[2] || "0.5",
            };
          }
        });
      }

      return element; // Trường hợp phần tử không phải là nốt nhạc hợp lệ
    };
    // Hàm để tách các phần tử âm nhạc và giữ nguyên các phần tử trong dấu ngoặc
    const splitMusicString = (musicString) => {
      // Biểu thức chính quy để khớp với các phần tử, bao gồm dấu ngoặc
      const regex = /\([^\)]+\)|\S+/g;

      // Tách chuỗi âm nhạc thành các phần tử
      const sections = musicString.match(regex) || [];

      // Xử lý và lọc các phần tử
      return sections
        .map((section) => section.trim())
        .filter((section) => section !== "" && !section.startsWith("%"));
    };

    // Tách các phần tử trong V:1 và V:2
    const vParts = vString.split(/(?=\nV:\d)/);

    vParts.forEach((part) => {
      const lines = part.split("\n").filter((line) => line.trim() !== "");

      if (lines[0].includes("V:1")) {
        // Xử lý tay phải (V:1)
        const v1Content = lines.slice(1).join(" ").trim();
        if (v1Content.trim().length > 0) {
          // Tách các phần tử và lọc bỏ các phần tử rỗng và bắt đầu bằng %
          tayTrai.push(
            ...splitMusicString(v1Content)
              .map(removeNumberedSymbols)
              .filter((note) => note.trim() !== "" && !note.startsWith("%"))
              .map(parseNoteDuration)
          );
        }
      } else if (lines[0].includes("V:2")) {
        // Xử lý tay trái (V:2)
        const v2Content = lines.slice(1).join(" ").trim();
        if (v2Content.trim().length > 0) {
          // Tách các phần tử và lọc bỏ các phần tử rỗng và bắt đầu bằng %
          tayPhai.push(
            ...splitMusicString(v2Content)
              .map(removeNumberedSymbols)
              .filter((note) => note.trim() !== "" && !note.startsWith("%"))
              .map(parseNoteDuration)
          );
        }
      }
    });

    return {
      tayTrai: tayTrai,
      tayPhai: tayPhai,
    };
  }

  const handleFileUpload = async () => {
    const file = mxlFile
    const reader = new FileReader();
    // Save the filename
    var gDisplayedName = file.name;
    var isMXL = file.name.toLowerCase().indexOf(".mxl") !== -1;

    reader.onload = async (event) => {
      const fileData = event.target.result;
      const fileName = file.name.toLowerCase();

      try {
        if (isMXL) {
          var zip = new JSZip();
          zip.loadAsync(file).then(
            function (zip) {
              // Read the META-INF metadata
              var fname = "META-INF/container.xml";

              zip.files[fname].async("string").then(
                function (theXML) {
                  // Need to parse the container.xml to find the root file
                  var xmldata = $.parseXML(theXML);

                  var rootfile = xmldata.getElementsByTagName("rootfile")[0];

                  // Get the main MusicXML file name in the zipfile
                  var fname = rootfile.getAttribute("full-path");

                  zip.files[fname].async("string").then(function (theText) {
                    // Check for MusicXML format
                    if (isXML(theText)) {
                      theText = importMusicXML(theText, gDisplayedName);
                      console.log(theText);
                      const notes = extractNotesFromABC(theText);
                      setRightnotes(notes.tayPhai);
                      setLeftnotes(notes.tayTrai);
                      gTheABC.current.value = theText; // Update the textarea
                    } else {
                      console.log("This is not a valid MXL file.");
                      return;
                    }

                    DoReadCommon(theText, false);
                  });

                  return;
                },
                function () {
                  console.log("This is not a valid MXL file.");
                  return;
                }
              );

              return;
            },
            function () {
              console.log("This is not a valid MXL file.");

              return;
            }
          );
        } else if (fileName.endsWith(".xml")) {
          // Handle .xml file directly
          processMusicXml(fileData, file.name);
        } else {
          setError("Unsupported file type. Please upload a .xml or .mxl file.");
        }
      } catch (err) {
        setError(`Error reading file: ${err.message}`);
      }
    };
    reader.readAsArrayBuffer(file); // For .mxl files, read as ArrayBuffer
  };

  const processMusicXml = (abcNotation) => {
    try {
      if (abcNotation) {
        // Render ABC notation
        visualObjRef.current = ABCJS.renderAbc(abcRef.current, abcNotation)[0];
        // Initialize synth controller
        synthControlRef.current = new ABCJS.synth.SynthController();
        synthControlRef.current.load("#audio", null, {
          displayRestart: true,
          displayPlay: true,
          displayProgress: true,
        });
        // Set the tune for playback
        synthControlRef.current.setTune(visualObjRef.current, false);
        setAbcNotation(abcNotation);
      } else {
        setError(
          "Conversion result is not in the expected format or is empty."
        );
      }
    } catch (error) {
      setError(`Conversion error: ${error.message}`);
    }
  };

  const handleSave = async() => {
    // // // const t = songSelected
    // const respone = await AddMxlFile(songSelected, instrumentSelected, title ,levelSelected, KeySignature,TopSignature, BottomSignature,mxlFile, image)
    // console.log(respone)
    // // console.log(songSelected, instrumentSelected, title ,levelSelected, KeySignature,TopSignature, BottomSignature,mxlFile, image)
  
  }
  return (
    <div>
      {/* <label
        htmlFor="mxl-upload"
        style={{
          display: "inline-block",
          padding: "10px 20px",
          backgroundColor: "#001529",
          color: "white",
          fontSize: "14px",
          fontWeight: "bold",
          borderRadius: "4px",
          cursor: "pointer",
          marginTop: '10px'
        }}
      >
        Upload MXL file
      </label>
      <input
        id="mxl-upload"
        type="file"
        accept=".xml, .mxl"
        onChange={ handleFileUpload}
        style={{ display: "none" }}
      /> */}
      <textarea
        ref={gTheABC}
        id="abc"
        style={{ width: "100%", height: "200px" }}
        placeholder="ABC notation will appear here"
      ></textarea>
      {/* {abcNotation && (
        <div>
          <h3>ABC Notation</h3>
          <pre>{abcNotation}</pre>
        </div>
      )} */}
      <h3>Rendered Music</h3>
      <div ref={abcRef}></div>
      <div id="audio" ref={audioRef} />
      <SheetEditor Rightnotes={Rightnotes} Leftnotes={Leftnotes} />
      <Button onClick={handleFileUpload} variant="contained" >
      handleFileUpload
        </Button>
    </div>
  );
};

export default MusicConverter;
