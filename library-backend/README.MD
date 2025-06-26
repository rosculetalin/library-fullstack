
I) Generate self-signed certificate on frontend

1. Install OpenSSL

For MS Windows, you need to install OpenSSL

In your web browser, visit the link: https://slproweb.com/products/Win32OpenSSL.html

In the table, move to the entry: Win64 OpenSSL v1.1.x Light.

Select the MSI download link

Once downloadeded to your computer, run the MSI file

During the installation process, select all of the defaults.

Update your system path environment variable to point to the openssl installation

a. Open the MS Windows Control Panel

b. Select System > Advanced System Settings

c. Click Environment Variables

d. In the System variables section, select the Path variable and click the Edit button.

e. At the beginning of the path, add: c:\Program Files\OpenSSL-Win64\bin;

NOTE: Be sure to update with the installation directory on your computer accordingly. f. Click Ok and proceed to close all of the dialogs.

2. Verify OpenSSL installation

Let's verify the OpenSSL installation

Open a new command-prompt window.

Type the following command:

`openssl help`

You will see the version of openssl installed. If so then openssl is installed successfully. :-)

3. Generate Key and Self-Signed Certificate

Open a command-prompt window.

Move into the directory of your React library project.

`cd library-frontend`

Create a new directory for your output files

`mkdir ssl-localhost`

Create a configuration file for the OpenSSL utility.

a. In the directory: react-library

b. Create a new file named: localhost.conf

Open the localhost.conf file and enter the following:

```
[req]
# Don't prompt the user when running openssl certificate generation
prompt = no
# Reference to the section containing the Distinguished Name (information about your company/entity)
distinguished_name = dn
[dn]
# Country, State and Locality (city)
C = RO
L = Bucharest
# Organization and Organizational Unit (department name, group name)
O = DigitalHive
OU = Training
# Common Name (fully qualified domain name of your website server)
CN = localhost
```

Save the file.

In the terminal window, run this command to generate the key and certificate. Be sure to enter this command as a single line.

```
openssl req -x509 -out ssl-localhost\localhost.crt -keyout ssl-localhost\localhost.key -newkey rsa:2048 -nodes -sha256 -days 365 -config localhost.conf
```

```
Argument	                         Description
req -x509	                         generate X.509 certificate
-out ssl-localhost/localhost.crt	 name of output certificate file
-keyout ssl-localhost/localhost.key	 name of output key file
-newkey rsa:2048	                 create new certificate request and a new private key using algorithm RSA and key size of 2048 bits
-nodes	                             No DES encryption. The generated private key will not be encrypted
-sha256	                             Use the SHA256 message digest to sign the request
-days 365	                         Certificate is valid for 365 days
-config localhost.conf	             Name of config file
```

This command generates the following output:

```
Generating a 2048 bit RSA private key
.......+++
...............................+++
writing new private key to 'ssl-localhost/localhost.key'
```

The command generates two files: localhost.crt and localhost.key.

View the newly generated files in the ssl-locahost directory.

`dir ssl-localhost`

Sample output

`localhost.crt   localhost.key`

View the contents of your certificate.

`openssl x509 -noout -text -in ssl-localhost/localhost.crt`

Sample Output

```
Certificate:
Data:
Version: ...
Serial Number: 13535095018565170476 (0xbbd6513516bc752c)
Signature Algorithm: sha256WithRSAEncryption
Issuer: C=RO, L=Bucharest, O=DigitalHive, OU=Training, CN=localhost
Validity
Not Before: May 29 21:25:12 2021 GMT
Not After : May 29 21:25:12 2022 GMT
Subject: C=Romania, L=Bucharest, O=DigitalHive, OU=Training, CN=localhost
Subject Public Key Info:
Public Key Algorithm: rsaEncryption
Public-Key: (2048 bit)
...
Exponent: 65537 (0x10001)
X509v3 extensions:
X509v3 Subject Alternative Name:
DNS:localhost
Signature Algorithm: sha256WithRSAEncryption
a2:9c:22:7c:73:ed:03:3f:ec:00:ce:c0:f6:0b:20:b4:09:6d:
...
```






II) Generate self-signed certificate on backend

NOTE: Keytool is already installed with the Java Development Kit. No additional installed is required.

Generate Key and Self-Signed Certificate

Open a terminal/command-prompt window.

Move into the directory of your Spring Boot library project.

`cd library-backend`

In the terminal window, run this command to generate the key and certificate. This is one long command, copy/paste in its entirety.

`keytool -genkeypair -alias digitalHive -keystore src/main/resources/digitalHive-keystore.p12 -keypass secret -storeType PKCS12 -storepass secret -keyalg RSA -keysize 2048 -validity 365 -dname "C=RO, L=Bucharest, O=digitalHive, OU=Training, CN=localhost" -ext "SAN=dns:localhost"`

```
Argument	Description
-genkeypair	Generates a key pair
-alias	    Alias name of the entry to process
-keystore	Name of output keystore file
-keypass	Key password
-storeType	Keystore type
-storepass	Keystore password
-keyalg	Key algorithm name
-keysize	Key bit size
-validity	Validity number of days
-dname	    Distinguished name
-ext	    Add the given X.509 extension
```

Detailed docs available here.

The command generates the file: src/main/resources/digitalHive-keystore.p12

Verify Results
View the contents of your certificate.

`keytool -list -v -alias digitalHive -keystore src/main/resources/digitalHive-keystore.p12 -storepass secret`

Sample Output

```
Alias name: digitalHive
Creation date: Jul 11, 2021
Entry type: PrivateKeyEntry
Certificate chain length: 1
Certificate[1]:
Owner: C=RO, L=Bucharest, O=digitalHive, OU=Training, CN=localhost
Issuer: C=RO, L=Bucharest, O=digitalHive, OU=Training, CN=localhost
Serial number: 9f1898a717a75375
Valid from: Sun Jul 11 00:02:10 EDT 2021 until: Mon Jul 11 00:02:10 EDT 2022
Certificate fingerprints:
SHA1: B6:14:8C:5F:0C:86:D6:32:3C:FC:D6:7E:2C:AD:AF:29:60:32:4F:38
SHA256: E1:B7:C7:ED:CE:1F:EE:C7:36:20:07:E4:51:5D:5D:3A:78:27:65:E5:E4:9C:EB:20:90:85:D8:1A:A4:EF:69:41
Signature algorithm name: SHA256withRSA
Subject Public Key Algorithm: 2048-bit RSA key
Version: 3
Extensions:
#1: ObjectId: 2.5.29.17 Criticality=false
SubjectAlternativeName [
DNSName: localhost
]
#2: ObjectId: 2.5.29.14 Criticality=false
SubjectKeyIdentifier [
KeyIdentifier [
0000: 0B 7D AA 0B 04 0F A5 20   51 5B FB C2 A3 DC 9B 78  ....... Q[.....x
0010: 19 9F 85 48                                        ...H
]
]
```

Spring Boot HTTPS configs

Edit your application.properties file

Add this snippet for Spring Boot SSL configs to the end of your application.properties file

```
#####
#
# HTTPS configuration
#
#####
# Server web port
server.port=8443
# Enable HTTPS support (only accept HTTPS requests)
server.ssl.enabled=true
# Alias that identifies the key in the key store
server.ssl.key-alias=digitalHive
# Keystore location
server.ssl.key-store=classpath:digitalHive-keystore.p12
# Keystore password
server.ssl.key-store-password=secret
# Keystore format
server.ssl.key-store-type=PKCS12
```






III) Export the certificate from keystore:

`keytool -exportcert -alias digitalhive -keystore library-backend/src/main/resources/digitalHive-keystore.p12 -storepass secret -file backend-cert.crt`

Add frontend and backend certificates to trusted authorities in windows

1. press windows + R 
2. type certmgr.msc
3. expand Trusted Root Certification Authorities
4. right click on Certificates -> All Tasks -> Import
5. import both certificates (frontend and backend - crt extensions)