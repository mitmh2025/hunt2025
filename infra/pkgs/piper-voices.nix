{ fetchgit
}:

fetchgit {
  url = "https://huggingface.co/rhasspy/piper-voices";
  branchName = "main";
  sparseCheckout = [
    "en/en_US/joe/medium"
    "en/en_US/norman/medium"
  ];
  fetchLFS = true;
  hash = "sha256-pF8anIxp47t9TUZFCA4BLpICQhrGrW8kvXEBtIU/5fw=";
}