<?php
 
 if (isset($_POST['username']) && isset($_POST['password'])) {
	if (!empty($_POST['username']) && !empty($_POST['password'])) {
		$contenu = json_decode(file_get_contents("base.json"));
		$nouvel_utilisateur = new StdClass();
		$nouvel_utilisateur->username=$_POST['username'];
		$nouvel_utilisateur->password=$_POST['password'];

		$trouve=false;
		foreach ($contenu as $objet) {
			if (
				($objet->username==$_POST['username'])
				&& ($objet->password==$_POST['password'])
			) {
				$trouve=true;
				break;
			}
		}

		if ($trouve==false) {
			array_push($contenu, $nouvel_utilisateur);
			$ok = file_put_contents("base.json", json_encode($contenu));
			if ($ok!==false) {
				$resultat = array(
					'result'  => true,
					'message' => '<div id="alert-success" class="alert alert-success"> <b> Vous êtes bien enregistré ! </b>Vous pouvez dès à present vous connecter.</div>'
				);
			} else {
				$resultat = array(
					'result'  => false,
					'message' => '<div id="alert-success" class="alert alert-danger"> <b> Problème lors de l\'enregistrement.</b</div>'
				);
			}
		} else{
			$resultat = array(
				'result'  => false,
				'message' => '<div id="alert-success" class="alert alert-warning"> <b> Vous êtes déjà enregistré.</b</div>'
			);
		}
	}
}
 
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
echo json_encode($resultat);