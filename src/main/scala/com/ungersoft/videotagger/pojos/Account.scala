package com.ungersoft.videotagger.pojos

import javax.persistence.Id
import com.googlecode.objectify.annotation.Indexed
import com.ungersoft.videotagger.util.JAXRSUtil
import javax.ws.rs._
import core.{MediaType, Response}
import javax.xml.bind.annotation.{XmlAccessorType, XmlRootElement}
import com.ungersoft.videotagger.services.datastore.DataService
import com.googlecode.objectify.Key

/**
 * Created by IntelliJ IDEA.
 * User: Randy
 * Date: 4/26/11
 * Time: 9:33 PM
 * To change this template use File | Settings | File Templates.
 */

@Indexed
@Path("/account")
@XmlRootElement
//@XmlAccessorType
class Account{
//  @Id  var id:java.lang.Long = null

  @Id var email:String = _
//  var pwd:String = _
//  var products:List[Product] = Nil
//  var media:List[Medium] = Nil
//  var ads:List[Ad] = Nil
  var ads:Array[Key[Ad]] = _

  def this(email:String){
    this()
    this.email = email
  }

  @GET
  @Produces(Array(MediaType.APPLICATION_JSON))
  def getAccount(
    @DefaultValue("") @QueryParam("email") email:String
  ):Response = {
    val res = DataService().retrieve(classOf[Account], email) match {
      case Some(x) => x
      case None => null
    }

//    val ads = DataService().retrieve(classOf[Ad], res.ads) match {
//      case Some(x) => x
//      case None => null
//    }
//    println("done")
    return JAXRSUtil.ok(res)
  }
}