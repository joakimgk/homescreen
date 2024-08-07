#!/usr/bin/perl
use strict;
use warnings;

my $full = $ARGV[0];

# Backup original package.json
print "Making copy of package.json\n";
system("cp package.json package_local.json");

# Edit package.json for production
print "Edit package.json for production\n";
open(my $fh, "<", "package.json") or die "Failed to open package.json: $!";
my @setup = <$fh>;
splice(@setup, 2, 0, "  \"homepage\": \"/startskjerm\",\n");
close $fh;

open($fh, ">", "package.json") or die "Failed to open package.json for writing: $!";
print $fh @setup;
close $fh;

# Run npm build
print "Running npm run build\n";
system("npm run build");
die "npm build failed: $?" if $? != 0;

# Transfer build artifacts to remote server
print "Copying build artifacts to remote server\n";

if ($full) {
    my $scp_command = "scp -r -i ~/.ssh/gknu build/* gknudsen\@login.domeneshop.no:www/startskjerm";
    system($scp_command);
    die "Failed to execute $scp_command: $?" if $? != 0;

} else {

    my $scp_command = "scp -r -i ~/.ssh/gknu build/static/* gknudsen\@login.domeneshop.no:www/startskjerm/static";
    system($scp_command);
    die "Failed to execute $scp_command: $?" if $? != 0;

    my $scp_command2 = "scp -r -i ~/.ssh/gknu build/index.html gknudsen\@login.domeneshop.no:www/startskjerm";
    system($scp_command2);
    die "Failed to execute $scp_command2: $?" if $? != 0;
}

# Restore package.json for local server
print "Restore package.json for local server\n";
system("cp package_local.json package.json");

print "\nDONE\n";