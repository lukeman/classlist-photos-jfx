window.addEvent('domready', function() { try{ClassListPhotos();} catch(e){} });

function ClassListPhotos(){
    // Grab the ClassList portlet, test result
    portlet = $$('#pg0_V_ggClassList')
    if(portlet != ""){
        // Create the header for our new column, insert it before the Ferpa column
        first_header = portlet.getChildren()[0][0].getChildren()[1].getChildren()[0]
        new Element('th',{'text':'Photo'}).injectBefore(first_header)
        
        // Grab the the students rowset
        students = portlet.getChildren()[0][1].getChildren()
    
        // For each row, grab the student ID from column[2] and call the asynchronous update function
        students.each( function(el) {
            columns = el.getChildren()
            ferpa_column = columns[0]
            student_id = columns[2].getText()
            photo_column = new Element('td').injectBefore(ferpa_column)
            photo_div = new Element('div').injectInside(photo_column)
            
            // Insert student_id's photo into the photo_div object
            PhotoFromID(photo_div,student_id)
        })
    }
}
function PhotoFromID (div,userid) {
    // Inserts an IMG tag with userid's photo inside of the first parameter
     var url = "JFX/ext/ClassListPhotos/PhotoFromID.aspx?hostid="+userid
     var ajaxRequest = function(){
         urlRequest = new Ajax(url, { method:'get', onComplete:function (request) {
            result = request
            if(result != ""){
                photo = new Element('img',{'id':'photo_'+userid,'class':'student_photo','width':'76','height':'100','src':result})
                photo.injectInside(div)
            }
         } }).request()
     }
     ajaxRequest()  
}

