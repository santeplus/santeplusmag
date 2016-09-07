<?php

$encrypted_path = str_replace("/", "", str_replace("/redir", "", $_SERVER["REQUEST_URI"]));
$path = base64_decode($encrypted_path);

function getMetaTags($str)
{
  $pattern = '
  ~<\s*meta\s

  # using lookahead to capture type to $1
    (?=[^>]*?
    \b(?:name|property|http-equiv)\s*=\s*
    (?|"\s*([^"]*?)\s*"|\'\s*([^\']*?)\s*\'|
    ([^"\'>]*?)(?=\s*/?\s*>|\s\w+\s*=))
  )

  # capture content to $2
  [^>]*?\bcontent\s*=\s*
    (?|"\s*([^"]*?)\s*"|\'\s*([^\']*?)\s*\'|
    ([^"\'>]*?)(?=\s*/?\s*>|\s\w+\s*=))
  [^>]*>

  ~ix';
  
  if(preg_match_all($pattern, $str, $out))
    return array_combine($out[1], $out[2]);
  return array();
}



$url = 'http://www.santeplusmag.com/' . $path . '/';
$contents = @file_get_contents($url);
$meta_data = getMetaTags($contents);

$new_url = str_replace(".com/", ".fr/open/", $meta_data['og:url']);
?>
<!--[if IE 6]>



<html id="ie6" lang="fr-FR" prefix="og: http://ogp.me/ns#">



<![endif]-->
<!--[if IE 7]>



<html id="ie7" lang="fr-FR" prefix="og: http://ogp.me/ns#">



<![endif]-->
<!--[if IE 8]>

<html id="ie8" lang="fr-FR" prefix="og: http://ogp.me/ns#">



<![endif]-->
<!--[if !(IE 6) | !(IE 7) | !(IE 8)  ]><!-->
<html lang="fr-FR" prefix="og: http://ogp.me/ns#">
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8"/>
	<meta name="viewport" content="width=device-width"/>
	<meta property='fb:app_id' content='218162468567008'/>
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<link rel="pingback" href="http://www.santeplusmag.fr/xmlrpc.php">
	<title><?php echo $meta_data['og:title']; ?> - Santé Plus Mag</title>
 
	<meta name="description" content="<?php echo $meta_data['og:description']; ?>"/>
	<meta name="robots" content="noodp"/>
	<meta property="og:locale" content="fr_FR"/>
	<meta property="og:type" content="article"/>
	<meta property="og:title" content="<?php echo $meta_data['og:title']; ?> - Santé Plus Mag"/>
	<meta property="og:description" content="<?php echo $meta_data['og:description']; ?> - Santé Plus Mag"/>
	<meta property="og:url" content="<?php echo $new_url; ?>"/>
	<meta property="og:image" content="<?php echo str_replace("com", "fr", $meta_data['og:image']) ; ?>"/>
	<meta property="og:image:width" content="<?php echo $meta_data['og:width']; ?>"/>
	<meta property="og:image:height" content="<?php echo $meta_data['og:height']; ?>"/>
</head>
<body>
<script type="text/javascript">
	//setTimeout(function(){ document.location = "<?php echo $url ?>"; }, 1000);
	
</script>
</body>
</html>