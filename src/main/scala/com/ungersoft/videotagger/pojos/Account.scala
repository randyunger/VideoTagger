package com.ungersoft.videotagger.pojos

import javax.persistence.Id
import com.googlecode.objectify.annotation.Indexed
import com.ungersoft.videotagger.util.JAXRSUtil
import javax.ws.rs._
import core.{MediaType, Response}
import com.ungersoft.videotagger.services.datastore.DataService
import com.googlecode.objectify.Key
import javax.xml.bind.annotation.{XmlAccessType, XmlAccessorType, XmlRootElement}
import javax.xml.bind.{Marshaller, Unmarshaller, JAXBContext}
import java.io.StringWriter

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
@XmlAccessorType(XmlAccessType.FIELD)
class Account{
//  @Id  var id:java.lang.Long = null

  @Id var email:String = _
//  var pwd:String = _
//  var products:List[Product] = Nil
//  var media:List[Medium] = Nil
//  var ads:List[Ad] = Nil
//  var ads:Array[Key[Ad]] = _

  def this(email:String){
    this()
    this.email = email
  }

  @GET
  @Produces(Array(MediaType.APPLICATION_JSON))
//  @Produces(Array(MediaType.APPLICATION_XML))
  def getAccount(
    @DefaultValue("") @QueryParam("email") email:String
  )={//:Response = {

    val res = DataService().retrieve(classOf[Account], email) match {
      case Some(x) => x
      case None => null
    }
//
//    DataService().query
//
//    val ads = DataService().query match {//(classOf[Ad], email) match {
//      case Some(x) => x
//      case None => null
//    }


//    val ads = DataService().retrieve(classOf[Ad], res.ads) match {
//      case Some(x) => x
//      case None => null
//    }
//    println("done")
//
//    val sw:java.io.StringWriter = new StringWriter();
//    val jc:JAXBContext = JAXBContext.newInstance("com.ungersoft.videotagger.pojos.Account")
//    val m:Marshaller = jc.createMarshaller();
//    val out = m.marshal(res, sw)

    res //JAXRSUtil.ok(res)
  }



}