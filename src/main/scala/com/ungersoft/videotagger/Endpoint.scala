package com.ungersoft.videotagger

/**
 * Created by IntelliJ IDEA.
 * User: Randy
 * Date: 4/25/11
 * Time: 9:08 PM
 * To change this template use File | Settings | File Templates.
 */

import datastore.{AbstractDataStore, ObjectifyDataStore}
import pojos.{Ad, Product}
import javax.ws.rs._
import com.sun.jersey.server.impl.model.parameter.multivalued.MultivaluedParameterExtractorFactory
@Path("/")
class Endpoint {
//  val ds:AbstractDataStore = new ObjectifyDataStore //(new ObjectifyDataStore).asInstanceOf[]

  @GET
  @Path("/helloworld")
  @Produces(Array("text/plain"))
  def getMessage: String = {
    return "Hello World scala 1"
  }

//  @POST
//  @Path("/saveAd")
//  @Produces(Array("text/plain"))
//  def saveAd(
//     //@DefaultValue(null)
//     @DefaultValue("0") @FormParam("id") id:Long
//    ,@DefaultValue("") @FormParam("title") title:String
//    ,@DefaultValue("") @FormParam("label") label:String
//    ,@DefaultValue("") @FormParam("copy") copy:String
//    ,@DefaultValue("0") @FormParam("productId") productId:Long
//    ): String = {    //if(null==0) null else
//    val nAd = new Ad(0, title, label, copy)  //no productId?
//    ds.store(nAd)
//    return "Saved "+nAd.id
//  }
//
//  @GET
//  @Path("/retrieveAd/{id}")
//  @Produces(Array("text/plain"))
//  def getAd(@PathParam("id") id:String): String = {
//    val res:Ad = ds.retrieve(classOf[Ad], id.toLong)
//    println(id)
//    return res.copy
//  }
//
//  @GET
//  @Path("/saveProduct")
//  @Produces(Array("text/plain"))
//  def saveProduct: String = {
//    val prod = new Product
//    prod.link="www.google.com"
//    ds.store(prod)
//    return "Saved "+prod.id
//  }
//
//  @GET
//  @Path("/retrieveProduct/{id}")
//  @Produces(Array("text/plain"))
//  def getProduct(@PathParam("id") id:String): String = {
//    val res:Product = ds.retrieve(classOf[Product], id.toLong)
//    println(id)
//    return res.link
//  }
}