using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Xml;
using System.Net.Http.Formatting;
using System.ServiceModel.Syndication;
using System.Net.Http.Headers;
using System.Net.Http;
using System.Net;


namespace REST_API_Service.Models
{
    public class SyndicationFeedFormatter : MediaTypeFormatter
    {
        private readonly string atom = "application/atom+xml";
        private readonly string rss = "application/rss+xml";

        public SyndicationFeedFormatter()
        {
            SupportedMediaTypes.Add(new MediaTypeHeaderValue(atom));
            SupportedMediaTypes.Add(new MediaTypeHeaderValue(rss));
        }

        Func<Type, bool> SupportedType = (type) =>
        {
            if (type == typeof(Product) || type == typeof(IEnumerable<Product>))
                return true;
            else
                return false;
        };

        public override bool CanReadType(Type type)
        {
            return SupportedType(type);
        }

        public override bool CanWriteType(Type type)
        {
            return SupportedType(type);
        }

        public override Task WriteToStreamAsync(Type type, object value, Stream writeStream, HttpContent content, TransportContext transportContext)
        {
            return Task.Factory.StartNew(() =>
            {
                if (type == typeof(Product) || type == typeof(IEnumerable<Product>))
                    BuildSyndicationFeed(value, writeStream, content.Headers.ContentType.MediaType);
            });
        }

        private void BuildSyndicationFeed(object models, Stream stream, string contenttype)
        {
            List<SyndicationItem> items = new List<SyndicationItem>();
            var feed = new SyndicationFeed()
            {
                Title = new TextSyndicationContent("My Feed")
            };

            if (models is IEnumerable<Product>)
            {
                var enumerator = ((IEnumerable<Product>)models).GetEnumerator();
                while (enumerator.MoveNext())
                {
                    items.Add(BuildSyndicationItem(enumerator.Current));
                }
            }
            else
            {
                items.Add(BuildSyndicationItem((Product)models));
            }

            feed.Items = items;

            using (XmlWriter writer = XmlWriter.Create(stream))
            {
                if (string.Equals(contenttype, atom))
                {
                    Atom10FeedFormatter atomformatter = new Atom10FeedFormatter(feed);
                    atomformatter.WriteTo(writer);
                }
                else
                {
                    Rss20FeedFormatter rssformatter = new Rss20FeedFormatter(feed);
                    rssformatter.WriteTo(writer);
                }
            }
        }

        private SyndicationItem BuildSyndicationItem(Product p)
        {
            var item = new SyndicationItem()
            {
                Title = new TextSyndicationContent(p.Name),
                LastUpdatedTime = p.CreatedAt,
                Content = new TextSyndicationContent(p.Description)
            };
            item.Authors.Add(new SyndicationPerson() { Name = p.CreatedBy });
            return item;
        }
    }
}