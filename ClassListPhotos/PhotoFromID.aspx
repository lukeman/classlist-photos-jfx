<%@ Page language="c#" %>
<%@ Import namespace="Jenzabar.Portal.Framework" %>
<%@ Import namespace="Jenzabar.ICS" %>

<script language="c#" runat="server">

  private void Page_Load(object sender, EventArgs e)
    {
	  try
	  {
		// This is a hack to pad the hostid string with zeroes
	  	double value = Convert.ToDouble(Request.QueryString["hostid"]);
		string hostid = value.ToString("00000000000");

		// Using framework calls to retrieve the PortalUser and UserPhotoObjects
		PortalUser p = PortalUser.FindByHostID(hostid);
		UserPhoto photo = UserPhoto.FindByUser(p);
	
		// Returns the value as found in ICS_UploadFile for this user
		Response.Write(photo.Path);
	  }
	  catch(Exception ex) // Hit it with a lazy hammer
	  { 
		Response.Write("");
	  }
    }
    

</script>