package com.ungersoft.videotagger.services.datastore

/**
 * Created by IntelliJ IDEA.
 * User: Randy
 * Date: 5/6/11
 * Time: 12:08 AM
 * To change this template use File | Settings | File Templates.
 */

object DataService{
  val store:AbstractDataStore = new ObjectifyDataStore       //todo:singleton
  def apply() = store
  def getInstance = apply
}