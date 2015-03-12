export default function(server) {

server.respondWith( 'GET',
'http://askthem.dev//identifier.json?person_id=S000033',
  [
 200,
{"Content-Type":"application/json; charset=utf-8","Cache-Control":"max-age=0, private, must-revalidate"},
"[{\"party\":\"Independent\",\"id\":\"S000033\",\"full_name\":\"Bernard Sanders\",\"photo_url\":\"http://theunitedstates.io/images/congress/225x275/S000033.jpg\",\"state\":\"vt\",\"political_position_title\":\"Senator\",\"most_recent_district\":null}]"
]);

server.respondWith( 'POST',
'http://askthem.dev/us/questions.json',
  [
 201,
{"Content-Type":"application/json; charset=utf-8","Cache-Control":"max-age=0, private, must-revalidate"},
"{\"question\":{\"url\":\"/vt/questions/54fe2fa51ed4318c0d000011?share=true\"}}"
]);

}
