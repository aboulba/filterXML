fs = require('fs');
let parser = require('xml2json');

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

                            if(elmlanguageGrp.termGrp[0].descripGrp[0].descrip[0]._ === GetString)
                            {
                                console.log('tekst:' + elmlanguageGrp.termGrp[0].term[0]);
                                console.log('Context:' + GetString);
                                console.log('taal:' + elmlanguageGrp.language[0].$.type);

                                //resultArry.push(elmlanguageGrp.termGrp[0].term[0]);
                                //resultArry.push(elmlanguageGrp.language[lagIndex].term[0]);
                            }

                    /*
                    elmlanguageGrp.termGrp.forEach((elmtermGrp, termGroepIndex )=> {
                        try
                        {
                        elmtermGrp.descripGrp.forEach((elmdescripGrp) => {
                            if(elmdescripGrp.descrip[0]._ === GetString)
                            {
                                console.log(elmlanguageGrp.termGrp[termGroepIndex].term[0]);
                                resultArry.push(elmlanguageGrp.termGrp[termGroepIndex].term[0]);
                                resultArry.push(elmlanguageGrp.language[lagIndex].term[0]);
                            }
                        });
                    }
                    catch(err )
                        {
                            //console.log('err:',err);
                        }
                    });
*/
                });
                if((finichedIndex) === result.mtf.conceptGrp.length-1){
                     resolve( resultArry);
                };
            });        
        });
     });    
  });
}

GetStringFromXML('Enscape').then(StringArray=>{
    // write to file StringArray
    console.log('done*************************************************************')
});

