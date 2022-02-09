fs = require('fs');
let parser = require('xml2json');
let excel = require('excel4node');
let workbook = new excel.Workbook();
let worksheet = workbook.addWorksheet('Sheet 1');
let getContent = 'Enscape'

function GetStringFromXML(GetString)
{
  return new Promise((resolve, reject) => {
    fs.readFile( './Vectorworks.xml', function(err, data) {
        if (err) {
            reject(err);
        }
        let xml2js = require('xml2js');
        let parser = new xml2js.Parser();
        let xml = data;
        let resultArry = []
        parser.parseString(xml, function (err, result) {
            result.mtf.conceptGrp.forEach((elementConceptGrp,finichedIndex) => {
                elementConceptGrp.languageGrp.forEach((elmlanguageGrp, lagIndex) => {
                try
                {
                    if(elmlanguageGrp.termGrp[0].descripGrp !== undefined && elmlanguageGrp.termGrp[0].descripGrp.length > 1)
                    {
                        if(elmlanguageGrp.termGrp[0].descripGrp[1].descrip[0]._ === GetString)
                        {
                            let obj = { 'alternativeId': elementConceptGrp.concept[0].$.alternativeId,
                                        'tekst': elmlanguageGrp.termGrp[0].term[0],
                                        'Context':  elmlanguageGrp.termGrp[0].descripGrp[0].descrip[0]._,
                                        'taal': elmlanguageGrp.language[0].$.type
                            };
                            resultArry.push(obj);
                        }
                    }
                    if(elmlanguageGrp.termGrp[0].descripGrp !== undefined && elmlanguageGrp.termGrp[0].descripGrp.length == 1)
                    {
                        if(elmlanguageGrp.termGrp[0].descripGrp[0].descrip[0]._ === GetString)
                        {
                            let obj = { 'alternativeId': elementConceptGrp.concept[0].$.alternativeId,
                                        'tekst': elmlanguageGrp.termGrp[0].term[0],
                                        'Context':  elmlanguageGrp.termGrp[0].descripGrp[0].descrip[0]._,
                                        'taal': elmlanguageGrp.language[0].$.type
                            };
                            resultArry.push(obj);
                        }
                    }
                        }catch(err)
                        {
                            console.log(elmlanguageGrp);
                        }
                });
                if((finichedIndex) === result.mtf.conceptGrp.length-1){
                     resolve( resultArry);
                };
            });        
        });
     });    
  });
}

GetStringFromXML(getContent).then(StringArray=>{
    console.log(StringArray);
    ExportToExcel(StringArray);
});


function ExportToExcel(dataObject)
{
    // write to file StringArray
    //console.log(dataObject);
    let vorigeID = dataObject[0].alternativeId;
    let OpEenRijtje = 0;
    let row = 2;
    worksheet.cell(1, 1).string('alternativeId'); 
    worksheet.cell(1, 2).string('English');
    worksheet.cell(1, 3).string('Context');

    let bgStyle = workbook.createStyle({
        fill: {
          type: 'pattern',
          patternType: 'solid',
          bgColor: '#B4C6E7',
          fgColor: '#B4C6E7',
        }
      });
      worksheet.cell(1, 1).style(bgStyle);
      worksheet.cell(1, 2).style(bgStyle);
      worksheet.cell(1, 3).style(bgStyle);

    worksheet.cell(1, 4).string('alternativeId');    
    worksheet.cell(1, 5).string('Dutch');
    worksheet.cell(1, 6).string('Context');

    bgStyle = workbook.createStyle({
        fill: {
          type: 'pattern',
          patternType: 'solid',
          bgColor: '#F4B084',
          fgColor: '#F4B084',
        }
      });
      worksheet.cell(1, 4).style(bgStyle);
      worksheet.cell(1, 5).style(bgStyle);
      worksheet.cell(1, 6).style(bgStyle);


    worksheet.cell(1, 7).string('alternativeId');    
    worksheet.cell(1, 8).string('Polish');
    worksheet.cell(1, 9).string('Context');
    
    bgStyle = workbook.createStyle({
        fill: {
          type: 'pattern',
          patternType: 'solid',
          bgColor: '#C6E0B4',
          fgColor: '#C6E0B4',
        }
      });
      worksheet.cell(1, 7).style(bgStyle);
      worksheet.cell(1, 8).style(bgStyle);
      worksheet.cell(1, 9).style(bgStyle);


    worksheet.cell(1, 10).string('alternativeId');    
    worksheet.cell(1, 11).string('French');
    worksheet.cell(1, 12).string('Context');

    bgStyle = workbook.createStyle({
        fill: {
          type: 'pattern',
          patternType: 'solid',
          bgColor: '#FFE699',
          fgColor: '#FFE699',
        }
      });
      worksheet.cell(1, 10).style(bgStyle);
      worksheet.cell(1, 11).style(bgStyle);
      worksheet.cell(1, 12).style(bgStyle);

    dataObject.forEach((dataElem, index) => {
        if (vorigeID !== dataElem.alternativeId)
        {
            row = row + 1;
            vorigeID = dataElem.alternativeId;
        }

        switch(dataElem.taal) {
        case "English":
            OpEenRijtje = 0;
            break;
        case "Dutch":
            OpEenRijtje = 3;
            break;
        case "Polish":
                OpEenRijtje = 6;                
            break;
        case "French":
            OpEenRijtje = 9;
            break;
        }

        worksheet.cell(row, 1 + OpEenRijtje).string(dataElem.alternativeId + '');
        worksheet.cell(row, 2 + OpEenRijtje).string(dataElem.tekst + '');
        worksheet.cell(row, 3 + OpEenRijtje).string(dataElem.Context + '');
        //worksheet.cell(row, 4 + OpEenRijtje).string(dataElem.taal + '');

    });

    workbook.write('Excel.xlsx');
    console.log('done!')
};


