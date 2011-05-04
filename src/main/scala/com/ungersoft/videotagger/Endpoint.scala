package com.ungersoft.videotagger

/**
 * Created by IntelliJ IDEA.
 * User: Randy
 * Date: 4/25/11
 * Time: 9:08 PM
 * To change this template use File | Settings | File Templates.
 */

import datastore.{AbstractDataStore, ObjectifyDataStore}
import pojos.Ad
import javax.ws.rs.{PathParam, GET, Produces, Path}

@Path("/")
class Endpoint {
  val ds:AbstractDataStore = new ObjectifyDataStore //(new ObjectifyDataStore).asInstanceOf[]

  @GET
  @Path("/helloworld")
  @Produces(Array("text/plain"))
  def getMessage: String = {
    return "Hello World scala 1"
  }

  @GET
  @Path("/save")
  @Produces(Array("text/plain"))
  def save: String = {
    val nAd = new Ad
    ds.store(nAd)
    return "Saved "+nAd.id
  }

  @GET
  @Path("/retrieve/{id}")
  @Produces(Array("text/plain"))
  def get(@PathParam("id") id:String): String = {
    val res:Ad = ds.retrieve(id.toLong)
    println(id)
    return res.copy
  }
}