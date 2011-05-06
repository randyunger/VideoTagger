package com.ungersoft.videotagger.pojos

import javax.persistence.Id
import com.googlecode.objectify.annotation.Indexed
import javax.ws.rs.core.Response
import com.ungersoft.videotagger.datastore.DataService
import com.ungersoft.videotagger.util.JAXRSUtil
import javax.ws.rs._

/**
 * Created by IntelliJ IDEA.
 * User: Randy
 * Date: 4/26/11
 * Time: 9:33 PM
 * To change this template use File | Settings | File Templates.
 */

@Indexed
@Path("/account")
class Account{
//  @Id  var id:java.lang.Long = null

  @Id var email:String = _
//  var pwd:String = _
  var products:List[Product] = _
  var media:List[Medium] = _
  var ads:List[Ad] = _

  @GET
  def getAccount(
    @DefaultValue("") @QueryParam("email") email:String
  ):Response = {
    val res = DataService().retrieve(classOf[Account], email)
    println("done")
    return JAXRSUtil.ok("done")
  }
}