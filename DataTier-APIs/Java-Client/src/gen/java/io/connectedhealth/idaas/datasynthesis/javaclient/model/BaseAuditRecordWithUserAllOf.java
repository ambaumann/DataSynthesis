/*
 * Query API
 * A list of get API calls that allows for pulling data
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


package io.connectedhealth.idaas.datasynthesis.javaclient.model;

import java.util.Objects;
import java.util.Arrays;
import com.google.gson.TypeAdapter;
import com.google.gson.annotations.JsonAdapter;
import com.google.gson.annotations.SerializedName;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.io.IOException;

/**
 * BaseAuditRecordWithUserAllOf
 */
@javax.annotation.Generated(value = "org.openapitools.codegen.languages.JavaClientCodegen", date = "2022-05-08T19:06:19.024256500-05:00[America/Chicago]")
public class BaseAuditRecordWithUserAllOf {
  public static final String SERIALIZED_NAME_CREATEDUSER = "createduser";
  @SerializedName(SERIALIZED_NAME_CREATEDUSER)
  private String createduser;

  public BaseAuditRecordWithUserAllOf() { 
  }

  public BaseAuditRecordWithUserAllOf createduser(String createduser) {
    
    this.createduser = createduser;
    return this;
  }

   /**
   * Get createduser
   * @return createduser
  **/
  @javax.annotation.Nullable
  @ApiModelProperty(value = "")

  public String getCreateduser() {
    return createduser;
  }


  public void setCreateduser(String createduser) {
    this.createduser = createduser;
  }


  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    BaseAuditRecordWithUserAllOf baseAuditRecordWithUserAllOf = (BaseAuditRecordWithUserAllOf) o;
    return Objects.equals(this.createduser, baseAuditRecordWithUserAllOf.createduser);
  }

  @Override
  public int hashCode() {
    return Objects.hash(createduser);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class BaseAuditRecordWithUserAllOf {\n");
    sb.append("    createduser: ").append(toIndentedString(createduser)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }

}
