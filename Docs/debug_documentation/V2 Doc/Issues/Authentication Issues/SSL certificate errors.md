SSL certificate errors occur when a web browser can't verify the SSL certificate installed on a site. For SSL errors such as:
```json
ERROR:  
{  
code: EPROTO,  
errno: EPROTO,  
message:  
request to <graphql-api> failed, reason: write EPROTO <....> alert handshake failure:..<...>: SSL alert number 40  
}
```

Follow the steps below to try and resolve the issue:

1. Allowlist the EPROTO error code (in client-side code).
2. Allow the retry logic to be activated.
3. Monitor the system for improvements or changes in the reconciliation process.