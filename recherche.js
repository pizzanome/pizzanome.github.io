function rechercheParNom(){
    var nom = document.getElementById("recherche").value;
    var requete = 'PREFIX owl: <http://www.w3.org/2002/07/owl#>' +
        'PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>' +
        'PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>' +
        'PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>' +
        'PREFIX foaf: <http://xmlns.com/foaf/0.1/>' +
        'PREFIX dc: <http://purl.org/dc/elements/1.1/>' +
        'PREFIX : <http://dbpedia.org/resource/>' +
        'PREFIX dbpedia2: <http://dbpedia.org/property/>' +
        'PREFIX dbpedia: <http://dbpedia.org/>' +
        'PREFIX skos: <http://www.w3.org/2004/02/skos/core#>' +
        'SELECT * WHERE {' +
        '?jeu a dbo:VideoGame; a dbo:Software; foaf:name ?name; dbo:releaseDate ?date; dbp:series ?serie ;rdfs:comment ?description.' +
        'FILTER(regex(?name,".*'+nom+'.*") && langMatches(lang(?description),"FR"))'+
        '}';

    var url_base = "http://dbpedia.org/sparql";
    var url = url_base + "?query=" + encodeURIComponent(requete) + "&format=json";
    console.log(url);

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        console.log(this.status);
        if (this.readyState == 4 && this.status == 200) {
            var results = JSON.parse(this.responseText);
            console.log(results);
            afficherResultats(results);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send(null);
}

function afficherResultats(data){

    var ressource,nom, date, serie, description;

    var div = document.getElementById("resultatsRecherche").innerHTML

    data.results.bindings.forEach(r => {
        ressource = r.jeu.value;
        nom = r.name.value;
        date = r.date.value;
        description = r.description.value;
        serie = r.serie.value;
    });

    document.getElementById("resultats").innerHTML = contenuTableau;

}