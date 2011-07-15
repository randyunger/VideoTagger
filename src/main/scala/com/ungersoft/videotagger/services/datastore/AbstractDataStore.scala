package com.ungersoft.videotagger.services.datastore

import com.ungersoft.videotagger.pojos.Ad

/**
 * Created by IntelliJ IDEA.
 * User: Randy
 * Date: 4/26/11
 * Time: 7:11 AM
 * To change this template use File | Settings | File Templates.
 */

trait AbstractDataStore{
  def register[T](clazz:Class[T])

  def store[T](t:T)

  def retrieve[T](clazz:Class[T], id:Long):Option[T]
//  def retrieve[T](clazz:Class[T], id:Array[Long]):Option[T]

  def retrieve[T](clazz:Class[T], id:String):Option[T]
//  def retrieve[T](clazz:Class[T], id:Array[String]):Option[T]
//  def find[T](clazz:Class[T], id:Long):T

  def query[T](clazz:Class[T], account:String):java.util.List[T] //Option[java.util.List[T]]
//  def retrieve[T](id:Long):T

//  def delete[T](clazz:Class[T], id:String)

  def delete[T](clazz:java.lang.Class[T], id:Long)//java.lang.Long)
}