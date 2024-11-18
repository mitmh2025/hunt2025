pkgs: self: super: {
  types = super.types // {
    tfName = self.types.strMatching "^[a-zA-Z_][a-zA-Z0-9_-]*$";
    tfAttrsOf = arg: self.types.addCheck (self.types.attrsOf arg) (x: self.all self.types.tfName.check (self.attrNames x));
  };
  tfSanitize = x: self.pipe x [
    (self.split "[^[:alnum:]_-]+")
    (self.concatMapStrings (s: if self.isList s then "-" else s))
  ];
}
