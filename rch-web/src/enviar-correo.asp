<%
	Dim strFrom
	Dim strTo
	Dim strBCC
	Dim strReplyTo
	Dim strSubject
	Dim strBody
	Dim strError 
	Dim bResult
	
	strFrom		= Request("correo-electronico")
	strTo		= "contacto.chepe@ferromex.mx"   'aquí va el correo al que se va a mandar
	strSubject	= "Contacto Chepe"
	strBody		= "Nombre: " & Request("nombre-apellido") & "<br/>Comentarios: " & Request("mensaje")
	
	strError = ""
	
	Function SendHTMLMail(ByVal strFrom, ByVal strTo, ByVal strSubject, ByVal strBody, ByRef strError)
		
		Dim oMsg
		
		Dim bResult 
				
		Set oMsg = CreateObject("CDO.Message")
		bResult = True
		
		If strFrom = "" And strTo = "" And strSubject = "" And strBody = "" Then
			bResult = False
		End If
		
		If bResult = True Then
			oMsg.HTMLBody = strBody
			oMsg.From = strFrom
			oMsg.To = strTo
			oMsg.Subject = strSubject
			oMsg.Configuration.Fields.Item("http://schemas.microsoft.com/cdo/configuration/sendusing")=2
			oMsg.Configuration.Fields.Item("http://schemas.microsoft.com/cdo/configuration/smtpserver")="relay01.ferromex.com.mx"
			oMsg.Configuration.Fields.Item("http://schemas.microsoft.com/cdo/configuration/smtpserverport")=25
			oMsg.Configuration.Fields.Update
			On Error Resume Next
			oMsg.Send
			If Err Then
				strError = Err.Description
				bResult = False
			Else
				bResult = True
			End If
		End If
			
		Set oMsg = Nothing
		SendHTMLMail = bResult
	End Function
	
	bResult = SendHTMLMail(strFrom, strTo, strSubject, strBody, strError)
	
	If bResult = True Then   'validación del envio del correo. Si está OK, se despliega el gracias.
		Response.Redirect "contacto?enviado=1"
	Else
		Response.Redirect "contacto?enviado=0"
	End If	
	
%>